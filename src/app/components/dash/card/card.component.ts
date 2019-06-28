import { Component, OnInit } from '@angular/core';
import { PopoverConfig } from 'ngx-bootstrap';
import { Card } from '../../../models/card';
import { Column } from '../../../models/column';
import { ApiService } from '../../../services/api/api.service';
import { User } from '../../../models/user';
import { ApiPayload } from '../../../interfaces/api-payload.interface';
import { ActivatedRoute, Params } from '@angular/router';

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
   * Current card ID from route
   */
  cardId: number;

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
      this.cardId = params.id;
    });
    // Load card data
    this.apiService.getCard(this.cardId).subscribe(card => {
      this.card = card;
      // Load projects of cards organization for selection
      this.apiService.getColumns(null, (this.card.column as Column).project as number).subscribe(data => {
        this.columns = data;
      });
      // Load users for selection
      this.apiService.getUsers().subscribe(data => {
        this.users = data.results;
      });
    });
  }

  /**
   * Update a card property
   */
  update(payload: ApiPayload): void {
    this.loading = true;
    this.apiService.updateCard(this.card.id, payload).subscribe(data => {
      this.loading = false;
      this.apiService.getCard(this.card.id).subscribe(card => {
        this.card = card;
      });
    });
  }
}
