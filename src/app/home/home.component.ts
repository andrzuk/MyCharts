import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AppConstants } from "../app-constants";

import { faHeartPulse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl("/admin");
    }, AppConstants.routeDelay);
  }

  faHeartPulse = faHeartPulse;
}
