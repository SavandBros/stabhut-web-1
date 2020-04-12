import { Project } from '@app/interfaces/project';

export interface Milestone {
  id: number
  name: string;
  content: string;
  closed: boolean;
  due_date: string;
  created: string;
  updated: string;
  project: number | Project[];
}
