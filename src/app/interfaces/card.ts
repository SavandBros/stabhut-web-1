export interface Card {
  id: number;
  title: string;
  column: number;
  content: string;
  assignee?: number;
  epic?: number;
  is_epic: boolean;
  milestone?: number;
  points?: number;
  points_estimate?: number;
  order: number;
  created: string;
  updated: string;
  labels: {
    id: number;
    label: number;
  }[];
  /**
   * Extra properties
   */
  loading?: boolean;
}
