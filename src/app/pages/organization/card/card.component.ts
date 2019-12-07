import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiPayload } from '@app/interfaces/api-payload';
import { Card } from '@app/interfaces/card';
import { Column } from '@app/interfaces/column';
import { User } from '@app/interfaces/user';
import { ApiService } from '@app/services/api.service';
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

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    // Get card ID from router params
    this.activatedRoute.params.subscribe((params: Params): void => {
      // Load card data
      this.apiService.getCard(params.card).subscribe((card: Card): void => {
        this.card = card;
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
      });
    });
  }
}
