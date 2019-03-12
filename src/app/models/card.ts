import { Label } from './label';
import { User } from './user';

export class Card {
  content: string;
  assignee: User;
  labels: Label[];

  constructor(content: string, assignee?: User, labels?: Label[]) {
    this.content = content;
    this.assignee = assignee;
    this.labels = labels;
  }
}
