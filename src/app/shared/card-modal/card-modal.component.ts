import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LabelKind } from '@app/enums/label-kind.enum';
import { ApiPayload } from '@app/interfaces/api-payload';
import { Card } from '@app/interfaces/card';
import { CardLabel } from '@app/interfaces/card-label';
import { Column } from '@app/interfaces/column';
import { Label } from '@app/interfaces/label';
import { LabelObjectCreated } from '@app/interfaces/label-object-created';
import { OrganizationService } from '@app/pages/organization/organization.service';
import { OrganizationBase } from '@app/pages/organization/shared/organization-base';
import { ApiService } from '@app/services/api.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { BsModalRef, PopoverConfig } from 'ngx-bootstrap';

export function getPopoverConfig(): PopoverConfig {
  return Object.assign(new PopoverConfig(), {
    placement: 'left',
    outsideClick: true,
  });
}

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
  providers: [DatePipe, { provide: PopoverConfig, useFactory: getPopoverConfig }],
})
export class CardModalComponent extends OrganizationBase implements OnInit {

  readonly trash: IconDefinition = faTrash;
  readonly check: IconDefinition = faCheck;

  @ViewChild('contentInput') contentInput: ElementRef<HTMLTextAreaElement>;
  @ViewChild('titleInput') titleInput: ElementRef<HTMLTextAreaElement>;

  /**
   * API loading
   */
  loading = false;

  /**
   * Card details
   */
  @Input() card: Card;

  /**
   * Columns to be selected
   */
  columns: Column[];

  /**
   * Labels list
   */
  labels: Label[] = [];

  /**
   * Content form control
   */
  content: FormControl = new FormControl('');

  /**
   * title form control
   */
  title: FormControl = new FormControl('', Validators.required);

  /**
   * Determines whether or not the user is editing card
   */
  isEditing: boolean;

  constructor(public bsModalRef: BsModalRef,
              private route: ActivatedRoute,
              private api: ApiService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef,
              private datePipe: DatePipe) {
    super();
  }

  ngOnInit(): void {
    /**
     * At once fill the content form control
     */
    this.content.setValue(this.card.content);
    this.title.setValue(this.card.title);
    /**
     * Get list of labels
     */
    OrganizationService.labels.subscribe((data: Label[]): void => {
      this.labels = data || [];
      this.labels.forEach((label: Label): void => {
        /**
         * Find label
         */
        const foundLabel: CardLabel = this.card.labels.find(cardLabel => cardLabel.label === label.id);
        /**
         * Mark label as selected if found
         */
        label.selected = !!foundLabel;
      });
    });
    /**
     * Load projects of cards organization for selection
     */
    this.api.getColumns(
      null, this.card.column.project as number,
    ).subscribe((data: Column[]): void => {
      this.columns = data;
    });
  }

  /**
   * Start editing
   *
   * @param value Whether or not cancel editing
   */
  editCard(value: boolean): void {
    this.isEditing = value;
    if (!value) {
      this.content.setValue(this.card.content);
      this.title.setValue(this.card.title);
      return;
    }
    this.changeDetectorRef.detectChanges();
    this.contentInput.nativeElement.focus();
    this.titleInput.nativeElement.focus();
  }


  /**
   * Update a card property
   */
  update(payload: ApiPayload): void {
    this.loading = true;
    this.api.updateCard(this.card.id, payload).subscribe((): void => {
      this.loading = false;
      this.api.getCard(this.card.id).subscribe(card => {
        this.card = card;
        this.content.setValue(card.content);
        this.title.setValue(card.title);
      });
    });
  }

  /**
   * Delete card
   */
  deleteCard(): void {
    if (!confirm('Delete card?\nThis action is not undoable.')) {
      return;
    }
    this.loading = true;
    this.api.deleteCard(this.card.id).subscribe((): void => {
      /**
       * Close the modal
       */
      this.cancel();
    }, (): void => {
      this.loading = false;
    });
  }

  /**
   * Update card labels on tooltip hidden
   */
  updateCardLabels(): void {
    this.labels.forEach((label: Label): void => {
      /**
       * Find label
       */
      const foundLabel: CardLabel = this.card.labels
        .find((cardLabel: CardLabel): boolean => cardLabel.label === label.id);
      /**
       * Assign label if it was selected and was not in the card's label list, and remove label
       * if it was deselected and was in the card's label list.
       */
      if (label.selected && !foundLabel) {
        this.api.assignLabel(LabelKind.CARD, this.card.id, label.id)
          .subscribe((data: LabelObjectCreated): void => {
            this.card.labels.push({ label: data.label, id: data.id });
          });
      } else if (!label.selected && foundLabel) {
        this.api.deAttachLabel(foundLabel.id).subscribe((): void => {
          this.card.labels.splice(this.card.labels.indexOf(foundLabel), 1);
        });
      }
    });
  }

  /**
   * Card created date
   */
  cardCreated() {
    return this.datePipe.transform(this.card.created);
  }

  /**
   * Card updated date
   */
  cardUpdated() {
    return this.datePipe.transform(this.card.updated);
  }

  /**
   * Clear queryParams and Close the modal
   */
  cancel(): void {
    const url: string = this.router.url.substring(0, this.router.url.indexOf('&'));
    this.router.navigateByUrl(url);
    this.bsModalRef.hide();
  }
}
