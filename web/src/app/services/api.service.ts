import { Question } from './../questionbank/types';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  users(): Promise<any> {
    try {
      return this.http.get(environment.SERVER_URL + '/user/list').toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  addQuestion(newQuestion: Question): Promise<any> {
    try {
      return this.http.post(environment.SERVER_URL + '/questions/add', newQuestion).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

}

