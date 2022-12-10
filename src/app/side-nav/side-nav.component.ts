import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../login/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(public dialog: MatDialog, public UsersService: UsersService) { }

  ngOnInit(): void {
  }
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

  
  change_theme(): void {
    document.body.classList.toggle('bright-theme');
  }
}
