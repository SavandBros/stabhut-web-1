export class Task {
  id: number;
  project: number;
  content: string;
  checked: boolean;

  constructor(data) {
    this.id = data.id;
    this.project = data.project;
    this.content = data.content;
    this.checked = data.checked;
  }
}
