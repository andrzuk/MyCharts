import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpService } from "../http.service";

import { AppConstants } from "../app-constants";

import { faHeartPulse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageContent: string = '';

  constructor(private router: Router, private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getPageData('index').subscribe((data: any) => {
      if (data.success) {
        this.pageContent = data.result.content;
      }
    });
    setTimeout(() => {
      this.router.navigateByUrl("/admin");
    }, AppConstants.routeDelay);
  }

  faHeartPulse = faHeartPulse;
}
