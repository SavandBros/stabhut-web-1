import { Label } from './label';

export class Card {
  id: number;
  column: number;
  content: string;
  assignee: number;
  order: number;
  updated: Date;
  created: Date;
  labels: Label[];

  constructor(data) {
    this.id = data.id;
    this.column = data.column;
    this.content = data.content;
    this.assignee = data.assignee;
    this.order = data.order;
    this.updated = new Date(data.updated);
    this.created = new Date(data.created);
  }
}
