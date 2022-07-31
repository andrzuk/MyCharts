import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { AppConstants } from "./app-constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'MyPressure';
  user: any;
  loggedIn: any;
  settings: any;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getSettings().subscribe((data: any) => {
      this.settings = data.result;
    });
    this.user = {
      name: localStorage.getItem(AppConstants.userName),
      email: localStorage.getItem(AppConstants.userEmail),
      logged_in: localStorage.getItem(AppConstants.loggedIn), 
      logged_out: localStorage.getItem(AppConstants.loggedOut) 
    };
    this.checkAuth();
  }

  checkAuth() {
    const token = localStorage.getItem(AppConstants.accessToken);
    if (token) {
      this.httpService.getAuth().subscribe((data: any) => {
        this.loggedIn = data.success;
      });
    }
    else {
      this.loggedIn = false;
    }
  }

  getSetting(keyName: string) {
    let result;
    this.settings.forEach((setting: any) => {
      if (setting.key_name == keyName) {
        result = setting.key_value;
      }
    });
    return result;
  }
}
