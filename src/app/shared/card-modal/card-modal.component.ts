import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LabelKind } from '@app/enums/label-kind.enum';
import { Card } from '@app/interfaces/card';
import { CardLabel } from '@app/interfaces/card-label';
import { Column } from '@app/interfaces/column';
import { Label } from '@app/interfaces/label';
import { LabelObject } from '@app/interfaces/label-object';
import { OrganizationService } from '@app/pages/organization/organization.service';
import { OrganizationBase } from '@app/pages/organization/shared/organization-base';
import { ApiService } from '@app/services/api.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PopoverConfig } from 'ngx-bootstrap/popover';

export function getPopoverConfig(): PopoverConfig {
  return Object.assign(new PopoverConfig(), {
    placement: 'left',
    outsideClick: true,
  });
}

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  providers: [DatePipe, { provide: PopoverConfig, useFactory: getPopoverConfig }],
})
export class CardModalComponent extends OrganizationBase implements OnInit {

  readonly trash: IconDefinition = faTrash;
  readonly check: IconDefinition = faCheck;
  readonly close: IconDefinition = faTimes;

  /**
   * On update event emitter
   */
  @Output() update = new EventEmitter<Card>();

  /**
   * Card to view
   */
  @Input() card: Card;

  /**
   * Columns that card can be in
   */
  @Input() columns: Column[];

  /**
   * API loading
   */
  loading = false;

  /**
   * Determines whether or not the user is editing card
   */
  isEditing: boolean;

  /**
   * Edit form
   */
  form: FormGroup;

  constructor(public modal: BsModalRef,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private api: ApiService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    /**
     * Setup edit form
     */
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      content: [''],
    });
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
  }

  /**
   * Setup editing the card
   * To cancel editing, just set isEditing to false
   */
  edit(): void {
    this.isEditing = true;
    this.form.setValue({
      title: this.card.title,
      content: this.card.content,
    });
  }

  /**
   * Update a card property
   */
  save(payload: Partial<Card>): void {
    this.loading = true;
    this.api.updateCard(this.card.id, payload).subscribe((data: Card): void => {
      this.loading = false;
      this.card = data;
      this.isEditing = false;
      this.update.emit(this.card);
    });
  }

  /**
   * Delete card
   */
  delete(): void {
    if (!confirm('Delete card?\nThis action is not undoable.')) {
      return;
    }
    this.loading = true;
    this.api.deleteCard(this.card.id).subscribe((): void => {
      this.update.emit();
      this.modal.hide();
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
      const foundLabel: CardLabel = this.card.labels.find((cardLabel: CardLabel): boolean => {
        return cardLabel.label === label.id;
      });
      /**
       * Assign label if it was selected and was not in the card's label list, and remove label
       * if it was deselected and was in the card's label list.
       */
      if (label.selected && !foundLabel) {
        this.api.assignLabel(LabelKind.CARD, this.card.id, label.id).subscribe((data: LabelObject): void => {
          this.card.labels.push({ label: data.label, id: data.id });
          this.update.emit(this.card);
        });
      } else if (!label.selected && foundLabel) {
        this.api.deAttachLabel(foundLabel.id).subscribe((): void => {
          this.card.labels.splice(this.card.labels.indexOf(foundLabel), 1);
          this.update.emit(this.card);
        });
      }
    });
  }
}
