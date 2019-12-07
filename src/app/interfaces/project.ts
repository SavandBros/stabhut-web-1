import { Chat } from '@app/interfaces/chat';
import { Column } from '@app/interfaces/column';
import { Task } from '@app/interfaces/task';

export interface Project {
  id: number;
  name: string;
  columns?: Column[];
  chats?: Chat[];
  tasks?: Task[];
}
