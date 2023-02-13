import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupService } from './../group.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
export interface DialogData {
  id: string;
}
@Component({
  selector: 'app-add-user-group',
  templateUrl: './add-user-group.component.html',
  styleUrls: ['./add-user-group.component.css'],
})
export class AddUserGroupComponent implements OnInit {
  constructor(
    private GroupService: GroupService,
    public dialogRef: MatDialogRef<AddUserGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const params =
      '?groupId=' +
      this.data.id +
      '&userId=' +
      form.value.UserId +
      '&Paymentstatu=' +
      form.value.Paymentstatu;
    this.GroupService.AddUserGroup(params, form.value.UserId);
  }
}
