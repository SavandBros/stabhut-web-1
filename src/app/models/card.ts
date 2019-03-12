import { Label } from './label';

export class Card {
  content: string;
  labels: Label[];

  constructor(content: string, labels: Label[] = []) {
    this.content = content;
    this.labels = labels;
  }
}
