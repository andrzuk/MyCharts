import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysDistrChartComponent } from './sys-distr-chart.component';

describe('SysDistrChartComponent', () => {
  let component: SysDistrChartComponent;
  let fixture: ComponentFixture<SysDistrChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysDistrChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysDistrChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
