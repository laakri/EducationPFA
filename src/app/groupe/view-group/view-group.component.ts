import { Component, OnInit, ViewChild } from "@angular/core";

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
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series?: ApexAxisChartSeries | any ;
  chart?: ApexChart | any ;
  xaxis?: ApexXAxis | any ;
  dataLabels?: ApexDataLabels | any ;
  grid?: ApexGrid | any ;
  fill?: ApexFill | any ;
  markers?: ApexMarkers | any ;
  yaxis?: ApexYAxis | any ;
  stroke?: ApexStroke | any ;
  title?: ApexTitleSubtitle | any ;
};
export interface PeriodicElement {
  name: string;
  position: number;
  student: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Informatique', student: 20 },
  {position: 2, name: 'Helium', student: 30},
  {position: 3, name: 'Lithium', student: 23},
  {position: 4, name: 'Beryllium', student: 10},
  {position: 5, name: 'Boron', student: 10},

];


@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.css']
})
export class ViewGroupComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'student'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
  }
  @ViewChild("chart") chart!: ChartComponent| any;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Likes",
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: 7,
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "1/11/2000",
          "2/11/2000",
          "3/11/2000",
          "4/11/2000",
          "5/11/2000",
          "6/11/2000",
          "7/11/2000",
          "8/11/2000",
          "9/11/2000",
          "10/11/2000",
          "11/11/2000",
          "12/11/2000",
          "1/11/2001",
          "2/11/2001",
          "3/11/2001",
          "4/11/2001",
          "5/11/2001",
          "6/11/2001"
        ]
      },
      title: {
        text: "Student",
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      grid: {
        show: false,
      },
      yaxis: {
        min: -10,
        max: 40,
        title: {
          text: "Engagement"
        }
      }
    };
  }
}
