import { Component, OnInit } from '@angular/core';
import { UIRouter } from '@uirouter/core';

import { Card } from '../../models/card';
import { ApiService } from '../../services/api/api.service';

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

  constructor(private router: UIRouter,
              private apiService: ApiService) {
    // Get card ID from router params
    this.cardId = router.globals.params.id;
  }

  ngOnInit(): void {
    // Load card data
    this.apiService.getCard(this.cardId).subscribe(card => {
      this.card = card;
    });
  }
}
