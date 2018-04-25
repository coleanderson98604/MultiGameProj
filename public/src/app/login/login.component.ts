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
  confirmMismatch: Boolean = false;
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
    //There's an Angular way to do this, but it's a bit complicated and would require refactoring. One consequence of the way I've done things is that form status don't reset properly on submission.
    if (this.user.password !== this.user.password_confirm){
      this.confirmMismatch = true;
      return;
    } else {
      this.confirmMismatch = false;
    }
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
        this._http.newSession(this.login['username']);
        this._router.navigate(['main']);
      } else {
        this.wrongLogin = true;
        form.reset();
      }
    });
  }

}
