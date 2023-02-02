import { Component } from '@angular/core';
import { UsersService } from './login/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'EducationWebsite';
  hovered = false;

  constructor(private UsersService: UsersService) {}
  ngOnInit() {
    this.UsersService.autoAuthUser();
  }
}
