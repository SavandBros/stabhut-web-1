import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
import { PopoverConfig } from 'ngx-bootstrap';

export function getPopoverConfig(): PopoverConfig {
  return Object.assign(new PopoverConfig(), {
    placement: 'left',
    outsideClick: true,
  });
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [{ provide: PopoverConfig, useFactory: getPopoverConfig }],
})
export class CardComponent extends OrganizationBase implements OnInit{

  readonly trash: IconDefinition = faTrash;
  readonly check: IconDefinition = faCheck;

  @ViewChild('contentInput', { static: false }) contentInput: ElementRef<HTMLTextAreaElement>;

  /**
   * API loading
   */
  loading = false;

  /**
   * Current card
   */
  card: Card;

  /**
   * Labels list
   */
  labels: Label[] = [];

  /**
   * Columns to be selected
   */
  columns: Column[];

  /**
   * Content form control
   */
  content: FormControl = new FormControl('', Validators.required);

  /**
   * Determines whether or not the user is editing card
   */
  isEditing: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef,
              private apiService: ApiService) {
    super();
  }

  ngOnInit(): void {
    // Get card ID from router params
    this.activatedRoute.params.subscribe((params: Params): void => {
      // Load card data
      this.apiService.getCard(params.card).subscribe((card: Card): void => {
        this.card = card;
        this.content.setValue(card.content);
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
        // Load projects of cards organization for selection
        this.apiService.getColumns(
          null, (this.card.column as Column).project as number
        ).subscribe((data: Column[]): void => {
          this.columns = data;
        });
      });
    });
  }

  /**
   * Update a card property
   */
  update(payload: ApiPayload): void {
    this.loading = true;
    this.apiService.updateCard(this.card.id, payload).subscribe((): void => {
      this.loading = false;
      this.apiService.getCard(this.card.id).subscribe(card => {
        this.card = card;
        this.content.setValue(card.content);
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
    this.apiService.deleteCard(this.card.id).subscribe((): void => {
      /**
       * Redirect user to project columns
       */
      this.router.navigate(['organization', this.activatedRoute.parent.snapshot.params.id], {
        queryParams: {
          project: (this.card.column as Column).project,
        },
      });
    }, (): void => {
      this.loading = false;
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
      return;
    }
    this.changeDetectorRef.detectChanges();
    this.contentInput.nativeElement.focus();
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
        this.apiService.assignLabel(LabelKind.CARD, this.card.id, label.id)
          .subscribe((data: LabelObjectCreated): void => {
            this.card.labels.push({ label: data.label, id: data.id });
          });
      } else if (!label.selected && foundLabel) {
        this.apiService.deAttachLabel(foundLabel.id).subscribe((): void => {
          this.card.labels.splice(this.card.labels.indexOf(foundLabel), 1);
        });
      }
    });
  }
}

