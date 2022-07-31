import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaStatsChartComponent } from './dia-stats-chart.component';

describe('DiaStatsChartComponent', () => {
  let component: DiaStatsChartComponent;
  let fixture: ComponentFixture<DiaStatsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaStatsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaStatsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
