import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  data: any;
  User: String;
  Room: String;
  OpenRooms = {};
  ListOfUsers = [];
  eric = "eric";
  keys = [];
  constructor(
    private _http: HttpService,
    private _router: Router
  ) {

  }

  ngOnInit() {
    this.User = this._http.user;
    //If no one is logged in, redirect back to login.
    if (!this.User){
      this._router.navigate(['login']);
    }
    this._http.listOfRooms().subscribe(rooms => {
      this.data = rooms;
    })
  }
  join(user){
    //calls the joinRoom function and passes in the user and room
    this._http.joinRoom({user:this.User, room: this.User});
    this._router.navigate(['room/' + user])
  }
  joinByClick(RoomSelected){
    this._http.joinRoom({user:this.User, room: RoomSelected});
    this._router.navigate(['room/' + RoomSelected]);
  }
  Rooms(){
    this._http.listOfRooms().subscribe(rooms => {
      let observable = this._http.getUsers();
      observable.subscribe(data => {
        for(let i=0; i< data['data'].length; i++){
          this.ListOfUsers.push(data['data'][i].username);
        }
        for(let room in rooms){
          if(this.ListOfUsers.includes(room)){
            this.OpenRooms[room] = rooms[room];
          }
        }
        for(let keys in this.OpenRooms){
          this.keys.push(keys);
        }
      });
      console.log(this.ListOfUsers,this.keys,this.OpenRooms);
    });
  }
}
