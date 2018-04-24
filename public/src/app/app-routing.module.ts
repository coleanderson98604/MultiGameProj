import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: 'room/:RoomName', component: RoomComponent},
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
