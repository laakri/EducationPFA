import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-group-meet',
  templateUrl: './group-meet.component.html',
  styleUrls: ['./group-meet.component.css'],
})
export class GroupMeetComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'my-room-name',
      width: 700,
      height: 700,
      parentNode: document.querySelector('#jitsi-container'),
    };
    const api = new JitsiMeetExternalAPI(domain, options);
  }
}
