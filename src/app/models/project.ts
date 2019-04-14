import { Column } from './column';
import { Chat } from './chat';
import { Task } from './task';

export class Project {
  id: number;
  name: string;
  columns: Column[];
  chats: Chat[];
  tasks: Task[];

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }
}
