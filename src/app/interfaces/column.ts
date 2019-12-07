import { Card } from '@app/interfaces/card';
import { Project } from '@app/interfaces/project';

export interface Column {
  id: number;
  name: string;
  project: Project | number;
  cards?: Card[];
}
