import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-information',
  templateUrl: './popup-information.component.html',
  styleUrls: ['./popup-information.component.css'],
})
export class PopupInformationComponent implements OnInit {
  constructor() {}
  right = -9999;
  bottom = -9999;

  ngOnInit() {
    setTimeout(() => {
      this.showDialog();
    }, 5000);
  }

  showDialog() {
    this.right = 26;
    this.bottom = 16;
  }

  closeDialog() {
    this.right = -9999;
    this.bottom = -9999;
  }
}
