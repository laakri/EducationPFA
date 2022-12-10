import { Component,Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-succes',
  templateUrl: './succes.component.html',
  styleUrls: ['./succes.component.css']
})
export class SuccesComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {message: string}) {}

  ngOnInit(): void {
  }

}
