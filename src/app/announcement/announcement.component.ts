import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  showFiller = false;
  myControl = new FormControl();
  fontStyleControl = new FormControl('');
  fontStyle= "all";
  constructor() { }
  Show(){
    this.showFiller=!this.showFiller
  }
  ngOnInit(): void {
  }

}
