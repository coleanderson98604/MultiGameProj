import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user: any;
  constructor(
    private _http: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.user = this._http.user;
    //If no one is logged in, redirect back to login.
    if (!this.user){
      this._router.navigate(['login']);
    }
  }

}
