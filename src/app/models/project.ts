import { Column } from './column';

export class Project {
  id: number;
  name: string;
  columns: Column[];

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }
}
