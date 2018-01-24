export class Comment {
  public content: string;
  public userId: number;
  public date: Date;
  constructor(content: string, userId: number) {
    this.date = new Date();
    this.content = content;
    this.userId = userId;
  }
}
