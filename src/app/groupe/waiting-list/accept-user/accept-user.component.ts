import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupService } from '../../group.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-accept-user',
  templateUrl: './accept-user.component.html',
  styleUrls: ['./accept-user.component.css'],
})
export class AcceptUserComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private GroupService: GroupService
  ) {}

  ngOnInit(): void {
    console.log(this.data.groupId, this.data.userId);
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const ch =
      '?groupId=' +
      this.data.groupId +
      '&+userId=' +
      this.data.userId +
      '&+Paymentstatu=' +
      form.value.status;

    this.GroupService.AddUserGroup(ch);
  }
}
