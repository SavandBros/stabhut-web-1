import { Chat } from 'src/app/interfaces/chat';
import { Column } from 'src/app/interfaces/column';
import { Task } from 'src/app/interfaces/task';

export interface Project {
  id: number;
  name: string;
  columns?: Column[];
  chats?: Chat[];
  tasks?: Task[];
}
