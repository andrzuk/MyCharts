import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AppComponent } from '../app.component';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-pressure-chart',
  templateUrl: './pressure-chart.component.html',
  styleUrls: ['./pressure-chart.component.scss']
})
export class PressureChartComponent implements OnInit {

  pressureData: any = [];
  lastPressureData: any = [];

  constructor(private httpService: HttpService, public appComponent: AppComponent) { }

  ngOnInit(): void {
    this.getDataFromServer();
  }

  getDataFromServer() {
    this.httpService.getPressureData().subscribe((data: any) => {
      if (data.success) {
        this.pressureData = data.result;
        this.lastPressureData = this.pressureData.slice(0, this.appComponent.getSetting('present_data_limit'));
        this.lastPressureData.forEach((item: any) => {
          this.pressChartData.labels?.push(item.id);
          this.pressChartData.datasets[0].data.push(item.sys);
          this.pressChartData.datasets[1].data.push(item.dia);
        });
        this.pressChartData.labels?.reverse();
        this.pressChartData.datasets[0].data.reverse();
        this.pressChartData.datasets[1].data.reverse();
        this.chart?.update();
      }
    });
  }

  public pressChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'SYS',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'DIA',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: 'rgba(255, 0, 0, 1)',
        pointBackgroundColor: 'rgba(255, 0, 0, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 0, 0, 1)',
        fill: 'origin',
      },
    ],
    labels: []
  };

  public pressChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      x: {},
      y: {
        position: 'left',
        beginAtZero: true,
        max: 250,
        grid: {
          color: 'rgba(100, 100, 100, 0.3)',
        },
        ticks: {
          color: '#666'
        }
      },
    },
    maintainAspectRatio: false,

    plugins: {
      legend: { display: true },
    }
  };

  public pressChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
}
