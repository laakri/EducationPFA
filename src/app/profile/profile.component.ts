import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { User } from './../login/user.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../login/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  spinner = false;
  GroupsByTeacherId: any;

  UserId!: string;
  userSub: Subscription = new Subscription();
  userRole: any;
  GroupsByTeacherSub: Subscription = new Subscription();
  users: any;
  private routeSub: Subscription | undefined;

  displayedColumns: string[] = [
    'img',
    'groupLevel',
    'groupStartDate',
    'groupPeriode',
    'statu',
  ];
  constructor(
    private ProfileService: ProfileService,
    private UserService: UsersService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.spinner = true;

    this.routeSub = this.route.params.subscribe((params) => {
      this.UserId = params['userId'];
    });
    this.userRole = this.UserService.getUserRole();

    this.ProfileService.getusers(this.UserId);

    this.userSub = this.ProfileService.getUserUpdateListener().subscribe(
      (users: User[]) => {
        this.users = users;

        this.users.forEach((user: { groups: any[] }) => {
          user.groups.forEach((group) => {
            const live = new Date(group.createdAt);
            group.createdAt = live.toDateString();

            const date = new Date(group.groupStartDate);

            group.groupStartDate = date.toDateString();

            const currentDate = new Date();
            let isDateGreater = false;

            if (date.getTime() < currentDate.getTime()) {
              isDateGreater = true;
            }
            group.isDateGreater = isDateGreater;
          });
        });
      }
    );

    /**************************************** */
    if (this.userRole == 'teacher') {
      this.ProfileService.getGroupsByTeacher(this.UserId);
      this.GroupsByTeacherSub =
        this.ProfileService.getGroupsByTeacherIdUpdateListener().subscribe(
          (GroupsByTeacherId: []) => {
            this.GroupsByTeacherId = GroupsByTeacherId;

            this.GroupsByTeacherId.forEach((group: any) => {
              const live = new Date(group.createdAt);
              group.createdAt = live.toDateString();

              const date = new Date(group.groupStartDate);

              group.groupStartDate = date.toDateString();

              const currentDate = new Date();
              let isDateGreater = false;

              if (date.getTime() < currentDate.getTime()) {
                isDateGreater = true;
              }
              group.isDateGreater = isDateGreater;
            });
          }
        );
    }
    /**************************************** */

    this.spinner = false;
  }
}
