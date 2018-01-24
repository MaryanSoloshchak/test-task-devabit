import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {User} from '../../app/models/user';
import {JSON_API} from '../../app/helpers/helper';

@Injectable()
export class UserService {

  constructor(private _http: HttpClient) { }

  public getAllUsers(): Observable<any> {
    return this._http.get(JSON_API + 'users');
  }
  public getUserById(userId: number) {
    return this._http.get(JSON_API + 'users' + '/' + userId).map( (res: User) => {
      res.password = '';
      return res;
    });
  }
  public followUser(model: User) {
    return this._http.patch(JSON_API + 'users/' + model.id, model);
  }
  public getFollowersOfUserById(userId: number) {
    return this._http.get(JSON_API + 'users').map( (res: Array<User>) => {
      return res.filter( x => {
        if (x.following) {
          return x.following.includes(userId);
        }
      });
    });
  }
  public getArrayOfUsersByIds(ids: Array<number>) {
    return this._http.get(JSON_API + 'users').map( (res: Array<User>) => {
      return res.filter( x => ids.includes(x.id));
    });
  }
}
