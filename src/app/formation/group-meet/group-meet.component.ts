import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var JitsiMeetExternalAPI: any;
import { Router } from '@angular/router';

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

  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = false;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.room = 'bwb-bfqi-vmh'; // set your room name
    this.user = {
      name: 'Akash Verma', // set your username
    };
  }
  ngAfterViewInit(): void {
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
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.user.name,
      },
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
  }
}
