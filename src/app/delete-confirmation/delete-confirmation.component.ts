import { Component, OnInit, Inject } from '@angular/core';
import { GroupService } from './../groupe/group.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css'],
})
export class DeleteConfirmationComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private GroupService: GroupService
  ) {}

  ngOnInit(): void {
    console.log(this.data.userId);
  }

  submit() {
    this.GroupService.deletUser(this.data.userId);
  }
}
