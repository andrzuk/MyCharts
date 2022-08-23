import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { AppConstants } from "./app-constants";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': AppConstants.tokenHeader
    })
  };

  getAuth() {
    const token = localStorage.getItem(AppConstants.accessToken) || '';
    this.httpOptions.headers = this.httpOptions.headers.set(AppConstants.tokenHeader, token);
    return this.httpClient.get<any>(AppConstants.apiURL + "/check_auth.php", this.httpOptions);
  }

  getSettings() {
    const token = localStorage.getItem(AppConstants.accessToken) || '';
    this.httpOptions.headers = this.httpOptions.headers.set(AppConstants.tokenHeader, token);
    return this.httpClient.get<any>(AppConstants.apiURL + "/get_settings.php", this.httpOptions);
  }

  signIn(formData: any) {
    const postData = new FormData();
    const entries = Object.entries(formData);
    entries.forEach((entry: any) => {
      postData.append(entry[0], entry[1]);
    });
    return this.httpClient.post<any>(AppConstants.apiURL + "/login.php", postData);
  }

  signOut() {
    return this.httpClient.get<any>(AppConstants.apiURL + "/logout.php", this.httpOptions);
  }

  getPressureData() {
    return this.httpClient.get<any>(AppConstants.apiURL + "/get_data.php", this.httpOptions);
  }

  setPressureData(formData: any) {
    const postData = new FormData();
    const entries = Object.entries(formData);
    entries.forEach((entry: any) => {
      postData.append(entry[0], entry[1]);
    });
    postData.append('token', localStorage.getItem(AppConstants.accessToken) || '');
    return this.httpClient.post<any>(AppConstants.apiURL + "/add_data.php", postData);
  }

  getSettingsData() {
    return this.httpClient.get<any>(AppConstants.apiURL + "/get_settings.php", this.httpOptions);
  }

  setSettingsData(formData: any) {
    const postData = new FormData();
    const entries = Object.entries(formData);
    entries.forEach((entry: any) => {
      postData.append(entry[0], entry[1]);
    });
    postData.append('token', localStorage.getItem(AppConstants.accessToken) || '');
    return this.httpClient.post<any>(AppConstants.apiURL + "/update_settings.php", postData);
  }

  getPageData(page: string) {
    return this.httpClient.get<any>(AppConstants.apiURL + "/get_page.php?id=" + page, this.httpOptions);
  }

  setPageData(formData: any) {
    const postData = new FormData();
    const entries = Object.entries(formData);
    entries.forEach((entry: any) => {
      postData.append(entry[0], entry[1]);
    });
    postData.append('token', localStorage.getItem(AppConstants.accessToken) || '');
    return this.httpClient.post<any>(AppConstants.apiURL + "/update_page.php", postData);
  }
}
