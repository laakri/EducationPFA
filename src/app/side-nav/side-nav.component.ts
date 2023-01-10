import { Component, OnInit } from '@angular/core';
import { UsersService } from '../login/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  isAuth = false;
  private isAuthListenerSubs!: Subscription;

  userName = '';
  constructor(public UsersService: UsersService) {}

  ngOnInit(): void {
    this.userName = this.UsersService.getUserName();
    this.isAuth = this.UsersService.getIsAuth();
    this.isAuthListenerSubs =
      this.UsersService.getAuthStatusListener().subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
      });

    this.isAuth = this.UsersService.getIsAuth();
  }

  logout() {
    this.UsersService.logout();
  }
  change_theme(): void {
    //localStorage.setItem('mode', 'bright-theme');
    document.body.classList.toggle('bright-theme');
  }
}
