import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  User: String;

  constructor(
    private _http: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.User = this._http.user;
    //If no one is logged in, redirect back to login.
    if (!this.User){
      this._router.navigate(['login']);
    }
  }

}
