import { User } from 'src/app/interfaces/user';
import { Column } from 'src/app/interfaces/column';

export interface Card {
  id: number;
  column: Column | number;
  content: string;
  assignee: User | number;
  order: number;
  updated: string;
  created: string;
}
