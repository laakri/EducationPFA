import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupService } from '../group.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../delete-confirmation/delete-confirmation.component';
import { AcceptUserComponent } from './accept-user/accept-user.component';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.css'],
})
export class WaitingListComponent implements OnInit {
  waitlistSub: Subscription = new Subscription();
  waitlists: any;
  constructor(private GroupService: GroupService, public dialog: MatDialog) {}

  Accept(userId: any, groupId: any): void {
    console.log(userId, groupId);

    const dialogRef = this.dialog.open(AcceptUserComponent, {
      width: '520px',
      minHeight: '320px',
      backdropClass: 'backdropBackground',
      data: { userId: userId, groupId: groupId },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  Delete(Id: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '620px',
      minHeight: '150px',
      backdropClass: 'backdropBackground',
      data: { userId: Id, data: 'Delete from Waitlist' },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  ngOnInit(): void {
    this.GroupService.getWaitlistUsers();
    this.waitlistSub = this.GroupService.getWaitListUpdateListener().subscribe(
      (waitlists: []) => {
        this.waitlists = waitlists;
      }
    );
  }
}
