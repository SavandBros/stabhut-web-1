export class Task {
  content: string;
  check: boolean;

  constructor(content: string, check: boolean = false) {
    this.content = content;
    this.check = check;
  }
}
