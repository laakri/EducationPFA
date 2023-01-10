import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../login/user.service';
import { Subject, Subscription } from 'rxjs';
import { User } from '../login/user.model';
import { debounceTime } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css'],
})
export class GroupeComponent implements OnInit {
  spinner = false;
  searchQuery = '';
  showFiller = false;
  myControl = new FormControl();
  userSub: Subscription = new Subscription();
  searchSubject = new Subject<string>();
  users: any;
  userlength = 0;
  query = '';
  defaultName = '?name=';
  constructor(
    public dialog: MatDialog,
    private UsersService: UsersService,
    private clipboard: Clipboard
  ) {}
  Show() {
    this.showFiller = !this.showFiller;
  }
  ngOnInit(): void {
    this.spinner = true;

    this.searchSubject.pipe(debounceTime(100)).subscribe((query) => {
      this.UsersService.getusersearch(this.defaultName + query);
      this.userSub = this.UsersService.getUserUpdateListener().subscribe(
        (users: User[]) => {
          this.users = users;
          console.log(this.users);
          this.userlength = users.length;
        }
      );
    });

    this.spinner = false;
  }
  login(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '630px',
      minHeight: '250px',
      backdropClass: 'backdropBackground',
    });
  }
  onCopy(id: string) {
    this.clipboard.copy(id);
  }
}
