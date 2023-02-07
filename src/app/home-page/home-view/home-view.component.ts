import { Component, ElementRef, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
})
export class HomeViewComponent implements OnInit {
  screenWidth?: number;
  slidesToShow = 3;
  numb?: any;
  constructor(private el: ElementRef) {
    this.getScreenSize();
  }

  ngOnInit() {
    const element = this.el.nativeElement.querySelector('#scroll-target');
    window.onscroll = () => {
      const viewportHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop <= viewportHeight) {
        element.classList.add('show');
      }
    };
  }
  slides = [
    { img: '../../../post-img.jpg' },
    { img: '../../../post-img.jpg' },
    { img: '../../../post-img.jpg' },
    { img: '../../../post-img.jpg' },
    { img: '../../../post-img.jpg' },
    { img: '../../../post-img.jpg' },
  ];
  slideConfig = { slidesToShow: this.slidesToShow, slidesToScroll: 1 };

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 1126) {
      this.slidesToShow = 1;
    } else {
      this.slidesToShow = 3;
    }
  }
}
