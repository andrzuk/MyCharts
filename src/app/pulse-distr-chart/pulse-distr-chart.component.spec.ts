import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulseDistrChartComponent } from './pulse-distr-chart.component';

describe('PulseDistrChartComponent', () => {
  let component: PulseDistrChartComponent;
  let fixture: ComponentFixture<PulseDistrChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PulseDistrChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PulseDistrChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
