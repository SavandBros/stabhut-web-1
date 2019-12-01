import { User } from 'src/app/interfaces/user';

export interface Organization {
  id: number;
  user: User;
  name: string;
}
