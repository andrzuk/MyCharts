import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysStatsChartComponent } from './sys-stats-chart.component';

describe('SysStatsChartComponent', () => {
  let component: SysStatsChartComponent;
  let fixture: ComponentFixture<SysStatsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysStatsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysStatsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
