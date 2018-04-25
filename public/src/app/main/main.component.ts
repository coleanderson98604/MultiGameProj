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
  availableRooms;
  ListOfUsers;
  constructor(
    private _http: HttpService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.User = this._http.user;
    //If no one is logged in, redirect back to login.
    if (!this.User){
      this._router.navigate(['login']);
    }
    this.Rooms();
    let observable = this._http.getUsers();
    observable.subscribe(data => {
      console.log('list of users', data);
      this.ListOfUsers = data;
    });
  }
  join(user){
    //calls the joinRoom function and passes in the user and room
    this._http.joinRoom({user:this.User, room: this.User});
    this._http.listOfRooms().subscribe(data => console.log('here is the room data', data))
    this._router.navigate(['room/' + user])
  }
  joinBySearch(){
    this._http.joinRoom({user:this.User, room: this.Room});
    this._router.navigate(['room/' + this.Room]);
  }
  Rooms(){
    this._http.listOfRooms().subscribe(data => {
      this.availableRooms = data;
      let temp = this.availableRooms;
      // for(let user in this.ListOfUsers){
      //   console.log(user)
      // }
    });
  }
}
