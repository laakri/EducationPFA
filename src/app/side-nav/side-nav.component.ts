import { Component, OnInit } from '@angular/core';
import { UsersService } from '../login/user.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  constructor(public UsersService: UsersService) {}

  ngOnInit(): void {}

  logout() {
    this.UsersService.logout();
  }
  change_theme(): void {
    //localStorage.setItem('mode', 'bright-theme');
    document.body.classList.toggle('bright-theme');
  }
}
