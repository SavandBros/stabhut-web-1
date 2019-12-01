import { Card } from 'src/app/interfaces/card';
import { Project } from 'src/app/interfaces/project';

export interface Column {
  id: number;
  name: string;
  project: Project | number;
  cards?: Card[];
}
