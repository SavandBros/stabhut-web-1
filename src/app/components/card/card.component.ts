import { Component, OnInit } from '@angular/core';
import { UIRouter } from '@uirouter/core';
import { PopoverConfig } from 'ngx-bootstrap';
import { ApiPayload } from '../../interfaces/api-payload.interface';

import { Card } from '../../models/card';
import { Column } from '../../models/column';
import { User } from '../../models/user';
import { ApiService } from '../../services/api/api.service';

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

  constructor(private router: UIRouter,
              private apiService: ApiService) {
    // Get card ID from router params
    this.cardId = router.globals.params.id;
  }

  ngOnInit(): void {
    // Load card data
    this.apiService.getCard(this.cardId).subscribe(card => {
      this.card = card;
      // Load projects of cards organization for selection
      this.apiService.getColumns((this.card.column as Column).project as number).subscribe(data => {
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
