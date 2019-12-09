import { Column } from '@app/interfaces/column';
import { User } from '@app/interfaces/user';

export interface Card {
  id: number;
  column: Column | number;
  content: string;
  assignee: User | number;
  order: number;
  updated: string;
  created: string;
  loading?: boolean;
}
