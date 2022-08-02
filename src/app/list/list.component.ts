import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

import { AppConstants } from "../app-constants";
import { AppComponent } from "../app.component";

import { faListOl } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pressureData: any = [];
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
        this.lastData = this.pressureData.slice(0, this.appComponent.getSetting('present_data_limit'));
      }
    });
  }

  faListOl = faListOl;
}
