import { Component } from '@angular/core';
import { UsersService } from './login/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isAuth = false;
  private isAuthListenerSubs!: Subscription;

  title = 'EducationWebsite';
  hovered = false;

  constructor(private UsersService: UsersService) {}
  ngOnInit() {
    this.isAuth = this.UsersService.getIsAuth();
    this.isAuthListenerSubs =
      this.UsersService.getAuthStatusListener().subscribe((isAuthenticated) => {
        this.isAuth = isAuthenticated;
      });

    this.isAuth = this.UsersService.getIsAuth();
    this.UsersService.autoAuthUser();
  }
}
