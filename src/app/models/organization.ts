import { User } from './user';

export class Organization {
  id: number;
  user: User;
  name: string;

  constructor(data) {
    this.id = data.id;
    this.user = new User(data.user);
    this.name = data.name;
  }
}
