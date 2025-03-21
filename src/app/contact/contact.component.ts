import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";

import { AppComponent } from "../app.component";

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  pageContent: string = '';

  constructor(private httpService: HttpService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.httpService.getPageData('contact').subscribe((data: any) => {
      if (data.success) {
        this.pageContent = data.result.contents;
        window.history.pushState({}, '', this.appComponent.rootURL);
      }
    });
  }

  faEnvelope = faEnvelope;
}
