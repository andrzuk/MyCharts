import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AppComponent } from '../app.component';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-dia-stats-chart',
  templateUrl: './dia-stats-chart.component.html',
  styleUrls: ['./dia-stats-chart.component.scss']
})
export class DiaStatsChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  pressureData: any = [];
  lastDiaData: any = [];
  valuesBorderHigh: any = 0;
  valuesBorderLow: any = 0;
  valuesHigh = 0;
  valuesMiddle = 0;
  valuesLow = 0;
  valuesSum = 0;
  valuesAverage = 0;

  constructor(private httpService: HttpService, public appComponent: AppComponent) { }

  ngOnInit(): void {
    this.getDataFromServer();
  }

  getDataFromServer() {
    this.httpService.getPressureData().subscribe((data: any) => {
      if (data.success) {
        this.pressureData = data.result;
        this.lastDiaData = this.pressureData.slice(0, this.appComponent.getSetting('present_data_limit'));
        this.valuesBorderHigh = this.appComponent.getSetting('dia_border_high');
        this.valuesBorderLow = this.appComponent.getSetting('dia_border_low');
        this.lastDiaData.forEach((item: any) => {
          if (parseInt(item.dia) < parseInt(this.valuesBorderLow)) {
            this.valuesLow++;
          }
          if (parseInt(item.dia) >= parseInt(this.valuesBorderLow) && parseInt(item.dia) < parseInt(this.valuesBorderHigh)) {
            this.valuesMiddle++;
          }
          if (parseInt(item.dia) >= parseInt(this.valuesBorderHigh)) {
            this.valuesHigh++;
          }
          this.valuesSum += parseInt(item.dia);
        });
        this.valuesAverage = Math.floor(this.valuesSum / this.lastDiaData.length);
        this.diaStatsChartData.datasets[0].data.push(this.valuesLow);
        this.diaStatsChartData.datasets[0].data.push(this.valuesMiddle);
        this.diaStatsChartData.datasets[0].data.push(this.valuesHigh);
        this.chart?.update();
      }
    });
  }

  public diaStatsChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  public diaStatsChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['niskie', 'średnie', 'wysokie'],
    datasets: [{
      data: [], 
      backgroundColor: ['rgba(0, 160, 0, 1)', 'rgba(240, 160, 0, 1)', 'rgba(220, 0, 0, 1)'],
      borderColor: ['rgba(250, 250, 250, 1)', 'rgba(250, 250, 250, 1)', 'rgba(250, 250, 250, 1)'],
      hoverBackgroundColor: ['rgba(0, 160, 0, 0.8)', 'rgba(240, 160, 0, 0.8)', 'rgba(220, 0, 0, 0.8)'],
      hoverBorderColor: ['rgba(0, 160, 0, 1)', 'rgba(240, 160, 0, 1)', 'rgba(220, 0, 0, 1)'],
    }],
  };

  public diaStatsChartType: ChartType = 'pie';
}
