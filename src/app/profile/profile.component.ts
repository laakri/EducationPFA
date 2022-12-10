import { Component, OnInit } from '@angular/core';
import * as internal from 'stream';

export interface PeriodicElement {
  type: string;
  Description: string;
  Date: string;
  amount:number;
  State: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {type: "None", Description: 'Hydrogen', Date: "24.12.2022", amount: 40, State:'Non Payer'},
  {type: "Check", Description: 'Helium', Date: "24.12.2022", amount: 40, State: 'Payer'},
  {type: "Cash", Description: 'Lithium', Date: "24.12.2022", amount: 40, State: 'Payer'},
  {type: "Check", Description: 'Beryllium', Date: "24.12.2022", amount: 40, State: 'Payer'},
  {type: "Check", Description: 'Boron', Date: "24.12.2022", amount: 40, State:'Payer'},
  {type: "Cash", Description: 'Carbon', Date: "24.12.2022", amount: 40, State:'Payer'},
  {type: "Check", Description: 'Nitrogen', Date: "24.12.2022", amount: 40, State:'Payer'},
  {type: "Cash", Description: 'Oxygen', Date: "24.12.2022", amount: 40, State:'Payer'},
  {type: "Check", Description: 'Fluorine', Date: "24.12.2022", amount: 40, State:'Payer'},
  {type: "Check", Description: 'Neon', Date: "24.12.2022", amount: 40, State: 'Payer'},
];


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  displayedColumns: string[] = ['type','Description', 'Date','amount' , 'State'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
