export class User {
  id: number;
  username: string;
  email: string;
  isSuperUser: boolean;
  dateJoined: Date;
  lastLogin: Date;

  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.isSuperUser = data.is_superuser;
    this.dateJoined = new Date(data.date_joined);
    this.lastLogin = new Date(data.last_login);
  }
}
