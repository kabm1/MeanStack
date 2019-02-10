import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../tabular/allusers/types';

export const LOGIN = 'LOGIN';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private ngRedux: NgRedux<AppState>, private http: HttpClient) { }

  setUser(user) {
    this.ngRedux.dispatch({ type: LOGIN, payload: user });
  }

  saveUser(user) {
    localStorage.setItem('current_user', user);
  }

  getUser() {
    return localStorage.getItem('current_user');
  }

  deleteUser() {
    localStorage.removeItem('current_user');
  }

  getUserPreviledge() {
    const user = JSON.parse(this.getUser());
    if (user) {
      return user.previledge;
    }
    return null;
  }

  getUserByEmail(email) {
    return this.http.get<User>(environment.SERVER_URL + '/user/profile?email=' + email);
  }
}
