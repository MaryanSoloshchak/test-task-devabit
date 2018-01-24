export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public following: Array<number>;
  constructor() {
    this.following = new Array<number>();
  }
}
