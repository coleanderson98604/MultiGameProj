import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  User: String;
  Room: String;
  messageText: String;
  messageArray:Array<{user:String, message:String}> = [] //will contain the join event information

  constructor(private _http: HttpService){
    // will push the join message into the message array
    this._http.newUserJoined().subscribe(data=> this.messageArray.push(data))

    this._http.userLeftRoom().subscribe(data => this.messageArray.push(data));

    this._http.newMessageRecieved().subscribe(data => this.messageArray.push(data));
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
