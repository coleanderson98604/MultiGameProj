import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  user: any;
  constructor (private _http: HttpClient) { }

  register(user){
    return this._http.post('/register', user);
  }

  login(user){
    return this._http.post('/login',user);
  }

  newSession(username){
    this.user = username;
  }
  
}
