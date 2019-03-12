import { Card } from './card';

export class Column {
  title: string;
  cards: Card[];

  constructor(title: string, cards: Card[] = []) {
    this.title = title;
    this.cards = cards;
  }
}
