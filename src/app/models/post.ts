import {Comment} from './comment';

export class Post {
  public id: number;
  public content: string;
  public date: Date;
  public userId: number;
  public comments: Array<Comment>;
  public likes: Array<number>;
  constructor() {
    this.comments = new Array<Comment>();
    this.likes = new Array<number>();
  }
}
