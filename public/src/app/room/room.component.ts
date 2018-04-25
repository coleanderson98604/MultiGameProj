import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  messageText: String;
  messageArray:Array<{user:String, message:String}> = [] //will contain the join event information
  User: String;
  Room: String;
  constructor(
    private _http: HttpService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    // leaves an open connection to notify when a user joins
    this._http.newUserJoined().subscribe(data=> this.messageArray.push(data))
    // leaves an open connection to notify when a user leaves
    this._http.userLeftRoom().subscribe(data => this.messageArray.push(data));
    // leaves an open connection to listen for any new messages
    this._http.newMessageRecieved().subscribe(data => this.messageArray.push(data));
  }

  ngOnInit() {
    this.User = this._http.user;
    this._route.params.subscribe((params: Params) => this.Room = params['RoomName']);
  }
  leave(){
    this._http.leaveRoom({user:this.User, room: this.Room});
    this._router.navigate(['main']);
  }
  sendMessage(){
    this._http.sendMessage({user:this.User, room: this.Room, message: this.messageText});
    this.messageText = "";
  }
}
