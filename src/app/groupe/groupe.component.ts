import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../login/user.service';
import { Subscription } from 'rxjs';
import { User } from '../login/user.model'
@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {
  showFiller = false;
  myControl = new FormControl();
  userSub: Subscription = new Subscription();
  users: any;

  constructor( private UsersService :UsersService) { }
  Show(){
    this.showFiller=!this.showFiller
  }
  ngOnInit(): void {
    this.UsersService.getusers();
    this.userSub = this.UsersService.getUserUpdateListener().subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
  }

}
