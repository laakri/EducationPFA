import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {
  showFiller = false;
  myControl = new FormControl();

  constructor() { }
  Show(){
    this.showFiller=!this.showFiller
  }
  ngOnInit(): void {
  }

}
