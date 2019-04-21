import { User } from './user';
import { Column } from './column';

export class Card {
  id: number;
  column: Column | number;
  content: string;
  assignee: User | number;
  order: number;
  updated: Date;
  created: Date;

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
