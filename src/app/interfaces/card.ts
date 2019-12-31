import { Column } from '@app/interfaces/column';
import { User } from '@app/interfaces/user';

export interface Card {
  id: number;
  column: Column | number;
  content: string;
  assignee: number;
  order: number;
  updated: string;
  created: string;
  labels: number[];
  /**
   * Extra properties
   */
  loading?: boolean;
}
