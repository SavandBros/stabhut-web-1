import { User } from './user';

export class Chat {
  user: User;
  content: string;
  date: Date;

  constructor(user: User, content: string, date: Date) {
    this.user = user;
    this.content = content;
    this.date = date;
  }
}
