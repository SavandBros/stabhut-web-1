import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  /**
   * Current card ID from route
   */
  cardId: number;

  /**
   * Current card
   */
  card: Card;

  constructor(private apiService: ApiService) {
    this.cardId = 1;
  }

  ngOnInit(): void {
    /**
     * Load card
     */
    this.apiService.getCard(this.cardId).subscribe(card => {
      this.card = card;
    });
  }
}
