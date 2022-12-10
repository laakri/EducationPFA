import { Component,Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {message: string}) { }

  ngOnInit(): void {

  }

}
