import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../login/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuth = false;
  userName = '';

  private isAuthListenerSubs!: Subscription;
  userIdLocal!: string | null;

  constructor(public dialog: MatDialog, private UsersService: UsersService) {}

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '530px',
      minHeight: '550px',
      backdropClass: 'backdropBackground',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  ngOnInit(): void {
    this.userIdLocal = localStorage.getItem('userId');
    console.log(this.userIdLocal);

    this.userName = this.UsersService.getUserName();
    this.isAuth = this.UsersService.getIsAuth();
    this.isAuthListenerSubs =
      this.UsersService.getAuthStatusListener().subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
      });

    this.isAuth = this.UsersService.getIsAuth();
  }
}
