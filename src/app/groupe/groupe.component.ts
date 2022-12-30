import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../login/user.service';
import { Subject, Subscription } from 'rxjs';
import { User } from '../login/user.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css'],
})
export class GroupeComponent implements OnInit {
  spinner = false;
  searchQuery = '';
  showFiller = false;
  myControl = new FormControl();
  userSub: Subscription = new Subscription();
  searchSubject = new Subject<string>();
  users: any;
  userlength = 0;
  query = '';
  defaultName = '?name=';
  constructor(private UsersService: UsersService) {}
  Show() {
    this.showFiller = !this.showFiller;
  }
  ngOnInit(): void {
    this.spinner = true;

    this.searchSubject.pipe(debounceTime(100)).subscribe((query) => {
      this.UsersService.getusers(this.defaultName + query);
      this.userSub = this.UsersService.getUserUpdateListener().subscribe(
        (users: User[]) => {
          this.users = users;
          this.userlength = users.length;
        }
      );
    });

    this.spinner = false;
  }
}
