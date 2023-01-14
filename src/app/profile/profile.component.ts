import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { User } from './../login/user.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  spinner = false;

  UserID!: string;
  userSub: Subscription = new Subscription();
  users: any;
  private routeSub: Subscription | undefined;

  displayedColumns: string[] = [
    'Description',
    'Date',
    'amount',
    'State',
    'statu',
  ];
  constructor(
    private ProfileService: ProfileService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.spinner = true;

    this.routeSub = this.route.params.subscribe((params) => {
      this.UserID = params['userId'];
    });

    this.ProfileService.getusers(this.UserID);

    this.userSub = this.ProfileService.getUserUpdateListener().subscribe(
      (users: User[]) => {
        this.users = users;
        console.log(this.users);
      }
    );
    this.spinner = false;
  }
}
