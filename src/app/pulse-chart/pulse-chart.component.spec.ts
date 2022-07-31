import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulseChartComponent } from './pulse-chart.component';

describe('PulseChartComponent', () => {
  let component: PulseChartComponent;
  let fixture: ComponentFixture<PulseChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PulseChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PulseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
