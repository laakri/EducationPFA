import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { GroupService } from './../groupe/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css'],
})
export class GroupsListComponent implements OnInit {
  length = 50;
  pageSize = 15;
  page = 0;
  filter?: any;
  pageSizeOptions = [5, 10, 15, 20, 30];
  pageEvent?: PageEvent;
  groupCategorie = '';
  groupLevel = '';
  groupCategory = '';
  filterToSend?: any;
  filterHandle: any;
  filterHandleX = '&groupCategory=';
  filterHandleY = '&groupLevel=';
  groupSub: Subscription = new Subscription();
  groups: any;
  constructor(
    private GroupService: GroupService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  leveloptions = [
    { value: '', viewValue: '- -' },
    { value: 'Beginner', viewValue: 'Beginner' },
    { value: 'Intermediate', viewValue: 'Intermediate' },
    { value: 'Advanced', viewValue: 'Advanced' },
    { value: 'Expert', viewValue: 'Expert' },
  ];
  categoryoptions = [
    { value: '', viewValue: '- -' },
    { value: 'Informatique', viewValue: 'Informatique' },
    { value: 'Math', viewValue: 'Math' },
  ];

  onChangeCategory(groupCategory: string) {
    this.router.navigate([], {
      queryParams: { groupCategory },
      queryParamsHandling: 'merge',
    });

    const parts = this.filterToSend.split('=');
    let cat = parts[3].split('&');
    cat = groupCategory + '&' + cat[1];
    this.filterToSend = [
      parts[0],
      parts[1],
      parts[2],
      cat,
      ...parts.slice(4),
    ].join('=');
    this.GroupService.getGroupFiltred(this.filterToSend);
    this.groupSub = this.GroupService.getGroupFiltredUpdateListener().subscribe(
      (groups: []) => {
        this.groups = groups;
      }
    );
  }

  onChangeLevel(groupLevel: string) {
    this.router.navigate([], {
      queryParams: { groupLevel },
      queryParamsHandling: 'merge',
    });

    const parts = this.filterToSend.split('=');
    this.filterToSend = [
      parts[0],
      parts[1],
      parts[2],
      parts[3],
      groupLevel,
      ...parts.slice(5),
    ].join('=');

    this.GroupService.getGroupFiltred(this.filterToSend);
    this.groupSub = this.GroupService.getGroupFiltredUpdateListener().subscribe(
      (groups: []) => {
        this.groups = groups;
      }
    );
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.page = e.pageIndex;

    const parts = this.filterToSend.split('=');
    let pagesize = parts[1].split('&');
    pagesize = this.pageSize + '&' + pagesize[1];

    let page = parts[2].split('&');
    page = this.page + '&' + page[2];

    this.filterToSend = [
      parts[0],
      pagesize,
      page,
      parts[3],
      parts[4],
      ...parts.slice(5),
    ].join('=');

    this.GroupService.getGroupFiltred(this.filterToSend);
    this.groupSub = this.GroupService.getGroupFiltredUpdateListener().subscribe(
      (groups: []) => {
        this.groups = groups;
      }
    );
  }
  ngOnInit(): void {
    this.filterToSend = '?pageSize=' + this.pageSize + '&page=' + this.page;

    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.filter = Object.entries(queryParams).map(([key, value]) => {
        if (key.toString()) {
          this.filterHandle = '&groupCategory=' + '&groupLevel=';
        }
        if (key.toString() == 'groupCategory') {
          this.filterHandleX = '&groupCategory=' + value.toString();
        }
        if (key.toString() == 'groupLevel') {
          this.filterHandleY = '&groupLevel=' + value.toString();
        }
      });
      this.filterHandle = this.filterHandleX + this.filterHandleY;
    });
    this.filterToSend = this.filterToSend + this.filterHandle;
    console.log(this.filterToSend);
    this.GroupService.getGroupFiltred(this.filterToSend);
    this.groupSub = this.GroupService.getGroupFiltredUpdateListener().subscribe(
      (groups: []) => {
        this.groups = groups;
      }
    );
  }
}
