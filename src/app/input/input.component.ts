import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

import { AppConstants } from "../app-constants";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  pressureData: any = [];
  inputForm = new FormGroup({
    season: new FormControl(''),
    sys: new FormControl(''),
    dia: new FormControl(''),
    pulse: new FormControl(''),
  });
  message: any = '';
  type: string = '';
  lastData: any = [];
  
  constructor(private httpService: HttpService, private router: Router, public appComponent: AppComponent) { }

  ngOnInit(): void {
    const token = localStorage.getItem(AppConstants.accessToken);
    if (token) {
      this.httpService.getAuth().subscribe((data: any) => {
        this.appComponent.loggedIn = data.success;
        if (this.appComponent.loggedIn) {
          this.getDataFromServer();
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

  getDataFromServer() {
    this.httpService.getPressureData().subscribe((data: any) => {
      if (data.success) {
        this.pressureData = data.result;
        this.lastData = this.pressureData.slice(0, this.appComponent.getSetting('last_values_limit'));
      }
    });
    document.getElementById('season')?.focus();
  }

  inputClick() {
    this.httpService.setPressureData(this.inputForm.value).subscribe((data: any) => {
      this.message = data.message;
      this.type = data.success ? 'success' : 'error';
      this.getDataFromServer();
    });
    this.inputForm.setValue({ season: '', sys: '', dia: '', pulse: '' });
  }
}
