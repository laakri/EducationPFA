import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GroupService } from './../group.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
interface Food {
  value: string;
  viewValue: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
];
@Component({
  selector: 'app-category-group',
  templateUrl: './category-group.component.html',
  styleUrls: ['./category-group.component.css'],
})
export class CatGroupsComponent implements OnInit {
  GroupSub: Subscription = new Subscription();
  Groups: any;
  CatToSend?: string;
  private routeSub: Subscription | undefined;
  CategoryName = '';
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
  foods: Food[] = [
    { value: '0', viewValue: 'Name' },
    { value: '1', viewValue: 'Age' },
    { value: '2', viewValue: 'Section' },
  ];
  constructor(
    public route: ActivatedRoute,
    private GroupService: GroupService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.CategoryName = params['groupName'];
    });
    this.CatToSend = '?groupCategory=' + this.CategoryName;
    this.GroupService.getGroups(this.CatToSend);
    this.GroupSub = this.GroupService.getGroupUpdateListener().subscribe(
      (Groups: []) => {
        this.Groups = Groups.reverse();
      }
    );
  }
}
