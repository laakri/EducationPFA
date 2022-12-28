import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  screenWidth?: number;
  slidesToShow= 3;
  numb? : any;
  constructor() { 
    this.getScreenSize();

  }

  ngOnInit(): void {

  }
  slides = [
    {img: "../../../post-img.jpg"},
    {img: "../../../post-img.jpg"},
    {img: "../../../post-img.jpg"},
    {img: "../../../post-img.jpg"},
    {img: "../../../post-img.jpg"},
    {img: "../../../post-img.jpg"},
  ];
  slideConfig = {"slidesToShow": this.slidesToShow, "slidesToScroll": 1};
  

  @HostListener('window:resize', ['$event'])
  
  getScreenSize(event?:any) {
        this.screenWidth = window.innerWidth;
        if (this.screenWidth >= 1126){
          this.slidesToShow = 1;
        }
        else{
          this.slidesToShow = 3;
        }
  }

}
