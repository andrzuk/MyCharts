import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

import { AppConstants } from "../app-constants";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settingsData: any = [];
  settingsValues: any = [];
  settingsForm = new FormGroup({
    app_title: new FormControl(''),
    app_logo: new FormControl(''),
    last_values_limit: new FormControl(''),
    present_data_limit: new FormControl(''),
    sys_border_high: new FormControl(''),
    sys_border_low: new FormControl(''),
    dia_border_high: new FormControl(''),
    dia_border_low: new FormControl(''),
    pulse_border_high: new FormControl(''),
    pulse_border_low: new FormControl(''),
  });
  message: any = '';
  type: string = '';

  constructor(private httpService: HttpService, private router: Router, public appComponent: AppComponent) { }

  ngOnInit(): void {
    const token = localStorage.getItem(AppConstants.accessToken);
    if (token) {
      this.httpService.getAuth().subscribe((data: any) => {
        this.appComponent.loggedIn = data.success;
        if (this.appComponent.loggedIn) {
          this.getSettingsFromServer();
        }
        else {
          this.router.navigateByUrl("/login");
        }
      });
    }
    else {
      this.appComponent.loggedIn = false;
      this.router.navigateByUrl("/login");
    }
  }

  getSettingsFromServer() {
    this.httpService.getSettingsData().subscribe((data: any) => {
      if (data.success) {
        this.settingsData = data.result;
        this.settingsData.forEach((item: any) => {
          this.settingsValues.push(item.key_value);
        });
        this.settingsForm.setValue({ 
          app_title: this.settingsValues[0],
          app_logo: this.settingsValues[1],
          last_values_limit: this.settingsValues[2],
          present_data_limit: this.settingsValues[3],
          sys_border_high: this.settingsValues[4],
          sys_border_low: this.settingsValues[5],
          dia_border_high: this.settingsValues[6],
          dia_border_low: this.settingsValues[7],
          pulse_border_high: this.settingsValues[8],
          pulse_border_low: this.settingsValues[9],
        });
      }
    });
  }

  saveClick() {
    this.httpService.setSettingsData(this.settingsForm.value).subscribe((data: any) => {
      this.message = data.message;
      this.type = data.success ? 'success' : 'error';
      this.getSettingsFromServer();
    });
  }
}
