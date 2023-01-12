import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GroupService } from './../group.service';
import { GroupUsers } from './../group.model';
@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css'],
})
export class GroupUsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phonenum',
    'createdAt',
    'view',
  ];
  dataSource: any;
  private routeSub: Subscription | undefined;
  groupId = '';
  groupIdToSend?: string;
  GroupSub: Subscription = new Subscription();
  Groups: any;
  groupUser?: any;
  groupUserLength = 0;

  constructor(
    public route: ActivatedRoute,
    private GroupService: GroupService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.groupId = params['groupId'];
    });
    this.groupIdToSend = '?groupId=' + this.groupId;
    console.log(this.groupIdToSend);
    this.GroupService.getGroupUsers(this.groupIdToSend);
    this.GroupSub =
      this.GroupService.getGroupUsersUpdateListenerTwo().subscribe(
        (GroupUsers: GroupUsers) => {
          this.groupUser = GroupUsers;
          this.groupUserLength = this.groupUser.groupUsers.length;
          console.log(this.groupUserLength);
        }
      );
  }
}
