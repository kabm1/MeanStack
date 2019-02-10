import { Injectable } from '@angular/core';
import { RestURLBuilder } from 'rest-url-builder';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private rURL = 'http://localhost:4000/questions?email:email&token:token';

  constructor() { }
  private urlBuilder = new RestURLBuilder();
 
  getUsers(email: string, token: string) { // userId = 4
    let builder = this.urlBuilder.buildRestURL(this.rURL);
    builder.setQueryParameter('email',email );
    builder.setQueryParameter('token',token );
    let finalURL =  builder.get(); // produces https://fromsomewhere.com/users/4
    return finalURL;
    
  }
} 

