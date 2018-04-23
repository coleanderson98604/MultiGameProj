import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //user for new user, login for login attempt
  user: any;
  login: any;
  constructor(
    private _http: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    //initialize user and login objects
    this.user = {username: ""};
    this.login = {username: ""};
  }

  register() {
    this._http.register(this.user).subscribe(data => console.log(data));
  }

  submitLogin() {
    this._http.login(this.login).subscribe(data => {
      if(data['succeeded']){
        this._http.newSession(this.login['username']);
        this._router.navigate(['main']);
      }
    });
  }

}
