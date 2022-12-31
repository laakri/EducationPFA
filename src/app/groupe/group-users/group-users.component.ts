import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GroupService } from './../group.service';

export interface PeriodicElement {
  id: string;
  teacherId: string;
  groupLevel: string;
  groupStartDate: string;
  groupPeriode: string;
  groupPrice: string;
  createdAt: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: '1',
    teacherId: 'Hydrogen',
    groupLevel: '1079',
    groupStartDate: 'H',
    groupPeriode: 'groupPeriode',
    groupPrice: 'groupPrice',
    createdAt: 'createdAt',
  },
  {
    id: '2',
    teacherId: 'Helium',
    groupLevel: '40026',
    groupStartDate: 'He',
    groupPeriode: 'groupPeriode',
    groupPrice: 'groupPrice',
    createdAt: 'createdAt',
  },
];
@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css'],
})
export class GroupUsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'teacherId',
    'groupLevel',
    'groupStartDate',
    'groupPeriode',
    'groupPrice',
    'createdAt',
  ];
  dataSource = ELEMENT_DATA;
  private routeSub: Subscription | undefined;
  groupId = '';
  groupIdToSend?: string;
  GroupSub: Subscription = new Subscription();
  Groups: any;

  constructor(
    public route: ActivatedRoute,
    private GroupService: GroupService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.groupId = params['groupId'];
    });
    this.groupIdToSend = '?groupId=' + this.groupId;
    console.log(this.Groups);

    this.GroupService.getGroupUsers(this.groupIdToSend);
    this.GroupSub = this.GroupService.getGroupUsersUpdateListener().subscribe(
      (Groups: []) => {
        this.Groups = Groups;
        console.log(this.Groups[0]);
      }
    );
  }
}
