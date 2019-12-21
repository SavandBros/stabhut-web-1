import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiPayload } from '@app/interfaces/api-payload';
import { Card } from '@app/interfaces/card';
import { Column } from '@app/interfaces/column';
import { User } from '@app/interfaces/user';
import { ApiService } from '@app/services/api.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
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
export class CardComponent implements OnInit {

  readonly trash: IconDefinition = faTrash;

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
   * Columns to be selected
   */
  columns: Column[];

  /**
   * Users to be selected
   */
  users: User[];

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
  }

  ngOnInit(): void {
    // Get card ID from router params
    this.activatedRoute.params.subscribe((params: Params): void => {
      // Load card data
      this.apiService.getCard(params.card).subscribe((card: Card): void => {
        this.card = card;
        this.content.setValue(card.content);
        // Load projects of cards organization for selection
        this.apiService.getColumns(
          null, (this.card.column as Column).project as number,
        ).subscribe((data: Column[]): void => {
          this.columns = data;
        });
        // Load users for selection
        this.apiService.getUsers().subscribe(data => {
          this.users = data.results;
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
}
