import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../login/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  @Input() showContentOnHover?: boolean;
  isAuth = false;
  private isAuthListenerSubs!: Subscription;
  getUserId: any;
  constructor(public UsersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.getUserId = this.UsersService.getUserId();
    this.isAuth = this.UsersService.getIsAuth();
    this.isAuthListenerSubs =
      this.UsersService.getAuthStatusListener().subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
      });

    this.isAuth = this.UsersService.getIsAuth();
  }
  onProfile() {
    const id = this.UsersService.getUserId();
    this.router.navigate(['/Homepage/Profile/' + id]);
  }

  logout() {
    this.UsersService.logout();
  }
}
