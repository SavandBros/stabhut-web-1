export class Chat {
  id: number;
  project: number;
  user: number;
  content: string;
  created: Date;

  constructor(data) {
    this.id = data.id;
    this.project = data.project;
    this.user = data.user;
    this.content = data.content;
    this.created = new Date(data.created);
  }
}
