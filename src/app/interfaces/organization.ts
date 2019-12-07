import { User } from '@app/interfaces/user';

export interface Organization {
  id: number;
  user: User;
  name: string;
}
