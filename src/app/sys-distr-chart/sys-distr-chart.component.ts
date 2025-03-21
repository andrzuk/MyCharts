import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AppComponent } from '../app.component';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-sys-distr-chart',
  templateUrl: './sys-distr-chart.component.html',
  styleUrls: ['./sys-distr-chart.component.scss']
})
export class SysDistrChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  sysData: any = [];
  lastSysData: any = [];
  distrData: any = [];

  constructor(private httpService: HttpService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.getDataFromServer();
  }

  getDataFromServer() {
    this.httpService.getPressureData().subscribe((data: any) => {
      if (data.success) {
        this.sysData = data.result;
        this.lastSysData = this.sysData.slice(0, this.appComponent.getSetting('present_data_limit'));
        this.lastSysData.forEach((item: any) => {
          this.distrData[parseInt(item.sys)] = 0;
        });
        this.lastSysData.forEach((item: any) => {
          this.distrData[parseInt(item.sys)]++;
        });
        for (var i = 0; i < this.distrData.length; i++) {
          if (this.distrData[i]) {
            this.sysChartData.labels?.push(i);
            this.sysChartData.datasets[0].data.push(this.distrData[i]);
          }
        }
        this.chart?.update();
      }
    });
  }

  public sysChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'SYS',
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 1)',
        pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        fill: 'origin',
      }
    ],
    labels: []
  };

  public sysChartOptions: ChartConfiguration['options'] = {
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

  public sysChartType: ChartType = 'bar';
}
