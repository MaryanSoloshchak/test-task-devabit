import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JSON_API} from '../../app/helpers/helper';
import {Post} from '../../app/models/post';
import {AuthService} from '../auth/auth.service';
import {User} from '../../app/models/user';

@Injectable()
export class PostService {

  constructor(private _http: HttpClient, private auth: AuthService) { }
  public getPostsOfUserWithId(userId: number) {
    return this._http.get(JSON_API + 'posts').map( (res: Array<Post>) => {
      return res.filter( x => x.userId === userId);
    });
  }
  public getPostsForHome(currentUser: User) {
    return this._http.get(JSON_API + 'posts').map( (posts: Array<Post>) => {
      return posts.filter(x => currentUser.following.includes(x.userId) || x.userId === currentUser.id);
    });
  }
  public addNewPost(model) {
    return this._http.post(JSON_API + 'posts', model);
  }
  public removePost(postId) {
    return this._http.delete(JSON_API + 'posts/' + postId);
  }
  public likePost(model) {
    return this._http.patch(JSON_API + 'posts/' + model.id, model);
  }
  public addComment(model) {
    return this._http.patch(JSON_API + 'posts/' + model.id, model);
  }
  public removeComment(model) {
    return this._http.patch(JSON_API + 'posts/' + model.id, model);
  }

}
