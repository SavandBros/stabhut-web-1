import { Column } from './column';
import { Chat } from './chat';

export class Project {
  id: number;
  name: string;
  columns: Column[];
  chats: Chat[];

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }
}
