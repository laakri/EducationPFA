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
  userId = '';
  userName = '';
  userPicture = '';
  isBrightTheme: any;

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
    this.isBrightTheme = document.body.classList.contains('bright-theme');

    const savedTheme = localStorage.getItem('mode');

    if (savedTheme) {
      document.body.classList.add(savedTheme);
    }
    this.userIdLocal = localStorage.getItem('userId');
    this.userId = this.UsersService.getUserId();
    this.userName = this.UsersService.getUserName();
    this.userPicture = this.UsersService.getUserPicture();

    this.isAuth = this.UsersService.getIsAuth();
    this.isAuthListenerSubs =
      this.UsersService.getAuthStatusListener().subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
      });

    this.isAuth = this.UsersService.getIsAuth();
  }

  change_theme(): void {
    const currentTheme = document.body.classList.contains('bright-theme')
      ? 'bright-theme'
      : 'dark-theme';
    const newTheme =
      currentTheme === 'bright-theme' ? 'dark-theme' : 'bright-theme';

    localStorage.setItem('mode', newTheme);

    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
  }
  getImgSrc(): string {
    const isBrightTheme = document.body.classList.contains('bright-theme');
    return isBrightTheme ? '../../assets/logo2.png' : '../../assets/logo1.png';
  }
  logout() {
    this.UsersService.logout();
  }
}
