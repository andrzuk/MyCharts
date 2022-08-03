import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AppComponent } from '../app.component';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-pulse-chart',
  templateUrl: './pulse-chart.component.html',
  styleUrls: ['./pulse-chart.component.scss']
})
export class PulseChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  pulseData: any = [];
  lastPulseData: any = [];

  constructor(private httpService: HttpService, public appComponent: AppComponent) { }

  ngOnInit(): void {
    this.getDataFromServer();
  }

  getDataFromServer() {
    this.httpService.getPressureData().subscribe((data: any) => {
      if (data.success) {
        this.pulseData = data.result;
        this.lastPulseData = this.pulseData.slice(0, this.appComponent.getSetting('present_data_limit'));
        this.lastPulseData.forEach((item: any) => {
          this.pulseChartData.labels?.push(item.id);
          this.pulseChartData.datasets[0].data.push(item.pulse);
        });
        this.pulseChartData.labels?.reverse();
        this.pulseChartData.datasets[0].data.reverse();
        this.chart?.update();
      }
    });
  }

  public pulseChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Pulse',
        backgroundColor: 'rgba(0, 160, 0, 0.3)',
        borderColor: 'rgba(0, 160, 0, 1)',
        pointBackgroundColor: 'rgba(0, 160, 0, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(0, 160, 0, 1)',
        fill: 'origin',
      }
    ],
    labels: []
  };

  public pulseChartOptions: ChartConfiguration['options'] = {
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
        max: 140,
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

  public pulseChartType: ChartType = 'line';
}
