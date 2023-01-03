import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '530px',
      minHeight: '550px',
      backdropClass: 'backdropBackground',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit(): void {}
}
