import { Card } from './card';
import { Project } from './project';

export class Column {
  id: number;
  name: string;
  project: Project | number;
  cards?: Card[];

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.project = data.project;
  }
}
