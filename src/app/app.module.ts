import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { InputComponent } from './input/input.component';
import { AdminComponent } from './admin/admin.component';
import { ListComponent } from './list/list.component';
import { ChartsComponent } from './charts/charts.component';
import { PressureChartComponent } from './pressure-chart/pressure-chart.component';
import { PulseChartComponent } from './pulse-chart/pulse-chart.component';
import { SysStatsChartComponent } from './sys-stats-chart/sys-stats-chart.component';
import { DiaStatsChartComponent } from './dia-stats-chart/dia-stats-chart.component';
import { PulseStatsChartComponent } from './pulse-stats-chart/pulse-stats-chart.component';
import { SettingsComponent } from './settings/settings.component';
import { ContactComponent } from './contact/contact.component';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { SysDistrChartComponent } from './sys-distr-chart/sys-distr-chart.component';
import { DiaDistrChartComponent } from './dia-distr-chart/dia-distr-chart.component';
import { PulseDistrChartComponent } from './pulse-distr-chart/pulse-distr-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    InputComponent,
    AdminComponent,
    ListComponent,
    ChartsComponent,
    PressureChartComponent,
    PulseChartComponent,
    SysStatsChartComponent,
    DiaStatsChartComponent,
    PulseStatsChartComponent,
    SettingsComponent,
    ContactComponent,
    SanitizeHtmlPipe,
    SysDistrChartComponent,
    DiaDistrChartComponent,
    PulseDistrChartComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgChartsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
