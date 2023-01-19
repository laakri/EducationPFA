import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.css'],
})
export class WaitingListComponent implements OnInit {
  waitlistSub: Subscription = new Subscription();
  waitlists: any;
  constructor(private GroupService: GroupService) {}

  ngOnInit(): void {
    this.GroupService.getWaitlistUsers();
    this.waitlistSub = this.GroupService.getWaitListUpdateListener().subscribe(
      (waitlists: []) => {
        this.waitlists = waitlists;
        console.log(this.waitlists);
      }
    );
  }
}
