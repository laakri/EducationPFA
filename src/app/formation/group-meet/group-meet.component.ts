import { throwError } from 'rxjs';
import { UsersService } from './../../login/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var JitsiMeetExternalAPI: any;
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group-meet',
  templateUrl: './group-meet.component.html',
  styleUrls: ['./group-meet.component.css'],
})
export class GroupMeetComponent implements OnInit, AfterViewInit {
  domain: string = 'meet.jit.si';
  room: any;
  options: any;
  api: any;
  user: any;
  userName: any;
  userRole: any;
  groupCode: any;

  constructor(
    private router: Router,
    private UsersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.groupCode = this.route.snapshot.paramMap.get('groupCode');
    this.userName = this.UsersService.getUserName();
    this.userRole = this.UsersService.getUserRole();
    console.log(this.groupCode, this.userName, this.userRole);

    this.room = this.groupCode;
    this.user = {
      name: this.userName,
    };
  }

  ngAfterViewInit(): void {
    let configOverwrite = {};
    if (this.userRole === 'student') {
      configOverwrite = {
        TOOLBAR_BUTTONS: [],
        SETTINGS_SECTIONS: [],
      };
    }

    this.options = {
      roomName: this.room,
      minwidth: 900,
      minheight: 500,
      interfaceConfigOverwrite: {
        DEFAULT_BACKGROUND: '#171a22',
        INVITATION_POWERED_BY: false,
        DISPLAY_WELCOME_PAGE_CONTENT: false,
        DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
        DISPLAY_ROOM_NAME: true,
      },
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        ...configOverwrite,
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.user.name,
      },
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
  }
}
