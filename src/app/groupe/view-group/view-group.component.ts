import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../category.service';
import { Categ } from '../category.model';
import { Subscription } from 'rxjs';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  xaxis?: ApexXAxis | any;
  dataLabels?: ApexDataLabels | any;
  grid?: ApexGrid | any;
  fill?: ApexFill | any;
  markers?: ApexMarkers | any;
  yaxis?: ApexYAxis | any;
  stroke?: ApexStroke | any;
  title?: ApexTitleSubtitle | any;
};

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.css'],
})
export class ViewGroupComponent implements OnInit {
  spinner = false;
  displayedColumns: string[] = ['name', 'created', 'view'];
  categSub: Subscription = new Subscription();
  categs: any;
  categlength = 0;

  ngOnInit(): void {
    this.spinner = true;
    this.CategoryService.getCategs();
    this.categSub = this.CategoryService.getCategUpdateListener().subscribe(
      (categs: Categ[]) => {
        this.categs = categs;
        this.categlength = categs.length;
      }
    );
    this.spinner = false;
  }
  @ViewChild('chart') chart!: ChartComponent | any;
  public chartOptions: Partial<ChartOptions>;

  constructor(private CategoryService: CategoryService) {
    this.chartOptions = {
      series: [
        {
          name: 'Likes',
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
      },
      stroke: {
        width: 7,
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '1/11/2000',
          '2/11/2000',
          '3/11/2000',
          '4/11/2000',
          '5/11/2000',
          '6/11/2000',
          '7/11/2000',
          '8/11/2000',
          '9/11/2000',
          '10/11/2000',
          '11/11/2000',
          '12/11/2000',
          '1/11/2001',
          '2/11/2001',
          '3/11/2001',
          '4/11/2001',
          '5/11/2001',
          '6/11/2001',
        ],
      },
      title: {
        text: 'Student',
        align: 'left',
        style: {
          fontSize: '16px',
          color: '#666',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#FDD835'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      grid: {
        show: false,
      },
      yaxis: {
        min: -10,
        max: 40,
        title: {
          text: 'Engagement',
        },
      },
    };
  }
}
