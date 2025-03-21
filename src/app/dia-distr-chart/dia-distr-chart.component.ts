import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AppComponent } from '../app.component';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-dia-distr-chart',
  templateUrl: './dia-distr-chart.component.html',
  styleUrls: ['./dia-distr-chart.component.scss']
})
export class DiaDistrChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  diaData: any = [];
  lastDiaData: any = [];
  distrData: any = [];

  constructor(private httpService: HttpService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.getDataFromServer();
  }

  getDataFromServer() {
    this.httpService.getPressureData().subscribe((data: any) => {
      if (data.success) {
        this.diaData = data.result;
        this.lastDiaData = this.diaData.slice(0, this.appComponent.getSetting('present_data_limit'));
        this.lastDiaData.forEach((item: any) => {
          this.distrData[parseInt(item.dia)] = 0;
        });
        this.lastDiaData.forEach((item: any) => {
          this.distrData[parseInt(item.dia)]++;
        });
        for (var i = 0; i < this.distrData.length; i++) {
          if (this.distrData[i]) {
            this.diaChartData.labels?.push(i);
            this.diaChartData.datasets[0].data.push(this.distrData[i]);
          }
        }
        this.chart?.update();
      }
    });
  }

  public diaChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'DIA',
        backgroundColor: 'rgba(255, 0, 0, 1)',
        borderColor: 'rgba(255, 0, 0, 1)',
        pointBackgroundColor: 'rgba(255, 0, 0, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 1)',
        pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointHoverBorderColor: 'rgba(255, 0, 0, 1)',
        fill: 'origin',
      }
    ],
    labels: []
  };

  public diaChartOptions: ChartConfiguration['options'] = {
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
        grid: {
          color: 'rgba(100, 100, 100, 0.3)',
        },
        ticks: {
          color: 'rgba(100, 100, 100, 1)'
        }
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
    }
  };

  public diaChartType: ChartType = 'bar';
}
