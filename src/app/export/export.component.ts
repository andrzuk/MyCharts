import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

import { AppConstants } from "../app-constants";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  pressureData: any = [];
  pressureStream: string = '';

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
        this.pressureData.reverse();
        this.pressureStream += 'INSERT INTO `_pressure` (`id`, `season`, `sys`, `dia`, `pulse`) VALUES\n';
        this.pressureData.forEach((item: any) => {
          this.pressureStream += '(' + item.id + ', \'' + item.season + '\', ' + item.sys + ', ' + item.dia + ', ' + item.pulse + '),\n';
        });
        this.pressureStream = this.pressureStream.slice(0, -2) + ';\n';
      }
    });
  }

  saveDataToFile() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.pressureStream));
    element.setAttribute('download', 'pressure-dump.sql');
    element.click();
  }
}
