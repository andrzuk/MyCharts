import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

import { AppConstants } from "../app-constants";
import { AppComponent } from "../app.component";

import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  message: any = '';
  
  constructor(private httpService: HttpService, private router: Router, public appComponent: AppComponent) { }

  ngOnInit(): void {
    const token = localStorage.getItem(AppConstants.accessToken);
    if (token) {
      this.httpService.getAuth().subscribe((data: any) => {
        this.appComponent.loggedIn = data.success;
        if (this.appComponent.loggedIn) {
          this.router.navigateByUrl("/admin");
        }
        else {
          setTimeout(() => {
            document.getElementById('email')?.focus();
          }, AppConstants.focusDelay);
          window.history.pushState({}, '', this.appComponent.rootURL);
        }
      });
    }
    else {
      this.appComponent.loggedIn = false;
      setTimeout(() => {
        document.getElementById('email')?.focus();
      }, AppConstants.focusDelay);
      window.history.pushState({}, '', this.appComponent.rootURL);
    }
  }

  loginClick() {
    this.httpService.signIn(this.loginForm.value).subscribe((data: any) => {
      if (data.user.access_token) {
        this.appComponent.user = data.user;
        this.appComponent.loggedIn = true;
        localStorage.setItem(AppConstants.accessToken, data.user.access_token);
        localStorage.setItem(AppConstants.userName, data.user.name);
        localStorage.setItem(AppConstants.userEmail, data.user.email);
        localStorage.setItem(AppConstants.userStatus, data.user.status);
        localStorage.setItem(AppConstants.loggedIn, data.user.logged_in);
        localStorage.setItem(AppConstants.loggedOut, data.user.logged_out);
        this.router.navigateByUrl("/admin");
      }
      else {
        this.appComponent.user = null;
        this.appComponent.loggedIn = false;
        localStorage.removeItem(AppConstants.accessToken);
        localStorage.removeItem(AppConstants.userName);
        localStorage.removeItem(AppConstants.userEmail);
        localStorage.removeItem(AppConstants.userStatus);
        localStorage.removeItem(AppConstants.loggedIn);
        localStorage.removeItem(AppConstants.loggedOut);
        this.message = data.message;
        setTimeout(() => {
          document.getElementById('email')?.focus();
        }, AppConstants.focusDelay);
      }
    })
    this.loginForm.setValue({ email: '', password: '' });
  }

  faRightToBracket = faRightToBracket;
}
