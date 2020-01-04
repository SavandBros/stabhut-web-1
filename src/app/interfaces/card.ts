import { CardLabel } from '@app/interfaces/card-label';
import { Column } from '@app/interfaces/column';

export interface Card {
  id: number;
  column: Column | number;
  content: string;
  assignee: number;
  order: number;
  updated: string;
  created: string;
  labels: CardLabel[];
  /**
   * Extra properties
   */
  loading?: boolean;
}
