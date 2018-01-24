import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JSON_API } from './../../app/helpers/helper';
import 'rxjs/add/operator/map';
import {User} from '../../app/models/user';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  private _isSignedIn = false;
  public get IsSignedIn() {
    return this._isSignedIn;
  }
  constructor(private _http: HttpClient, private router: Router) {
    if (localStorage.getItem('currentUser')) {
      this._isSignedIn = true;
      this.router.navigateByUrl('/authenticated');
    }
  }
  public login(model) {
    return this._http.get(JSON_API + 'users').map((res: Array<User>) => {
       return res.find( x => x.email === model.email && x.password === model.password);
    });
  }
  public register(model) {
    return this._http.post(JSON_API + 'users', model);
  }
  public setCurrentUser(userId) {
    this._isSignedIn = true;
    localStorage.setItem('currentUser', userId); // need to use user id instead of access token
  }
  public getCurrentUser() {
    const userId = +localStorage.getItem('currentUser');
    return this._http.get(JSON_API + 'users').map((res: Array<User>) => {
      return res.find( x => x.id === userId);
    });
  }
  public isCurrentUser(id) {
    return +localStorage.getItem('currentUser') === id;
  }
  public logOut() {
    this._isSignedIn = false;
    localStorage.removeItem('currentUser');
  }
}
