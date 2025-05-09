import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { AppConstants } from "./app-constants";

import { faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faFileEdit } from '@fortawesome/free-solid-svg-icons';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: any;
  user: any;
  loggedIn: any;
  settings: any;
  rootURL: string;

  constructor(private httpService: HttpService) {
    this.title = 'MyPressAdmin';
    this.rootURL = AppConstants.rootURL;
  }

  ngOnInit() {
    this.httpService.getSettingsData().subscribe((data: any) => {
      this.settings = data.result;
      this.title = this.getSetting('app_title');
    });
    this.user = {
      name: localStorage.getItem(AppConstants.userName),
      email: localStorage.getItem(AppConstants.userEmail),
      status: localStorage.getItem(AppConstants.userStatus),
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
    if (this.settings) {
      this.settings.forEach((setting: any) => {
        if (setting.key_name == keyName) {
          result = setting.key_value;
        }
      });  
    }
    return result;
  }

  faHeartCircleCheck = faHeartCircleCheck;
  faUserCheck = faUserCheck;
  faScrewdriverWrench = faScrewdriverWrench;
  faRightToBracket = faRightToBracket;
  faRightFromBracket = faRightFromBracket;
  faDownload = faDownload;
  faFileEdit = faFileEdit;
  faHouseChimney = faHouseChimney;
  faEnvelope = faEnvelope;
}
