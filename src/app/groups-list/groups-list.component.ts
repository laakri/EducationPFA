import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { GroupService } from './../groupe/group.service';
import { map } from 'rxjs/operators';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css'],
})
export class GroupsListComponent implements OnInit {
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 2, 3];
  pageEvent?: PageEvent;
  groupCategorie = '';
  filterToSend = '';
  groupSub: Subscription = new Subscription();
  groups: any;

  constructor(private GroupService: GroupService) {}
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.filterToSend =
      '?pageSize=' + this.pageSize + '&page=' + this.pageIndex;

    this.GroupService.getGroupFiltred(this.filterToSend);
    this.groupSub = this.GroupService.getGroupFiltredUpdateListener().subscribe(
      (groups: []) => {
        this.groups = groups;
      }
    );
  }
  ngOnInit(): void {
    this.filterToSend =
      '?pageSize=' + this.pageSize + '&page=' + this.pageIndex;

    this.GroupService.getGroupFiltred(this.filterToSend);
    this.groupSub = this.GroupService.getGroupFiltredUpdateListener().subscribe(
      (groups: []) => {
        this.groups = groups;
      }
    );
  }
}
