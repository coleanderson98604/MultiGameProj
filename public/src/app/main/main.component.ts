import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  User: String;
  Room: String;
  messageText: String;
  messageArray:Array<{user:String, message:String}> = [] //will contain the join event information
  constructor(
    private _http: HttpService,
    private _router: Router
  ) { 
    this._http.newUserJoined().subscribe(data=> this.messageArray.push(data))

    this._http.userLeftRoom().subscribe(data => this.messageArray.push(data));

    this._http.newMessageRecieved().subscribe(data => this.messageArray.push(data));
  }

  ngOnInit() {
    this.User = this._http.user;
    //If no one is logged in, redirect back to login.
    if (!this.User){
      this._router.navigate(['login']);
    }
  }
  join(){
    //calls the joinRoom function and passes in the user and room
    console.log(this.User, this.Room)
    this._http.joinRoom({user:this.User, room: this.Room});
  }
  leave(){
    this._http.leaveRoom({user:this.User, room: this.Room});
  }
  sendMessage(){
    this._http.sendMessage({user:this.User, room: this.Room, message: this.messageText});
  }

}
