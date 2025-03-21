import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaDistrChartComponent } from './dia-distr-chart.component';

describe('DiaDistrChartComponent', () => {
  let component: DiaDistrChartComponent;
  let fixture: ComponentFixture<DiaDistrChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaDistrChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaDistrChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
