export interface Label {
  organization: number;
  name: string;
  color: string;
  id: number;
  /**
   * Extra properties
   */
  selected?: boolean;
}
