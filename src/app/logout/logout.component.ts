import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from "@angular/router";

import { AppComponent } from "../app.component";
import { AppConstants } from "../app-constants";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router, public appComponent: AppComponent) { }

  ngOnInit(): void {
    this.logOut();
  }

  logOut() {
    const token = localStorage.getItem(AppConstants.accessToken);
    if (token) {
      this.httpService.signOut().subscribe((data: any) => {
        this.appComponent.loggedIn = false;
      });
    }
    else {
      this.appComponent.loggedIn = false;
    }
    this.appComponent.user = null;
    this.appComponent.loggedIn = false;
    localStorage.removeItem(AppConstants.accessToken);
    localStorage.removeItem(AppConstants.userName);
    localStorage.removeItem(AppConstants.userEmail);
    localStorage.removeItem(AppConstants.loggedIn);
    localStorage.removeItem(AppConstants.loggedOut);
    this.router.navigateByUrl("/");
  }
}
