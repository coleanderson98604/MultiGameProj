import { Component, OnInit,  Input, Output, EventEmitter  } from '@angular/core';
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
  registered: Boolean = false;
  wrongLogin: Boolean = false;

  constructor(
    private _http: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    //initialize user and login objects
    this.cleanForms();
  }

  cleanForms() {
    this.user = {username: "", password: "", password_confirm: ""};
    this.login = {username: "", password: ""}
  }

  register(form) {
    this._http.register(this.user).subscribe(data => {
      if(data['succeeded']){
        this.registered = true;
        form.reset();
      } else {
        this.registered = false;
      }
    });
  }

  submitLogin(form) {
    this._http.login(this.login).subscribe(data => {
      if(data['succeeded']){
        this._http.UserInfo(this.login['username'])
        this._http.newSession(this.login['username']);
        this._router.navigate(['main']);
      } else {
        this.wrongLogin = true;
        form.reset();
      }
    });
  }

}
