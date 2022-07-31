import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulseStatsChartComponent } from './pulse-stats-chart.component';

describe('PulseStatsChartComponent', () => {
  let component: PulseStatsChartComponent;
  let fixture: ComponentFixture<PulseStatsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PulseStatsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PulseStatsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
