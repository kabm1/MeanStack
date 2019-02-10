import { User } from './../tabular/allusers/types';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as decode from 'jwt-decode';

import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // tslint:disable-next-line:max-line-length
  constructor( private http: HttpClient, private router: Router,  private token: TokenService, private user: UserService, private ngRedux: NgRedux<AppState>, ) { }

  login(credentials) {
    console.log(credentials);
    return this.http.post(environment.SERVER_URL + '/user/signin', credentials);
  }

  signup(credentials) {
    return this.http.post(environment.SERVER_URL + '/user/signup', credentials);
  }

  validate(email) {
    return this.http.post(environment.SERVER_URL + '/user/validateEmail', { email: email });
  }

  updateAccount(credentials) {
    return this.http.post(environment.SERVER_URL + '/user/update', credentials);
  }

  logOut() {
    this.user.setUser(null);
    this.user.deleteUser();
    this.token.deleteToken();
    this.router.navigate(['/signin']);
  }

  isLoggedIn() {
    const userPayload = this.token.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  isAdmin() {
    const previledge = this.user.getUserPreviledge();
    if (previledge === 'ADMIN') {
      return true;
    }
    return false;
  }

  getUser() {
      const decoded = decode(this.token.getToken());
      const email = decoded.sub;
      const user = this.http.get(environment.SERVER_URL + '/user/profile?email=' + email);
      this.user.setUser(user);
      return user;
  }

}
