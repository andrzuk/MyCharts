import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from "../http.service";
import { Router, ActivatedRoute } from "@angular/router";

import { AppConstants } from "../app-constants";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.scss']
})
export class EditpageComponent implements OnInit {

  routeParam: any;
  editorInit: any = { 
    plugins: 'lists link image table code help wordcount' 
  };
  editorForm = new FormGroup({
    pageId: new FormControl(''),
    editorContent: new FormControl(''),
  });

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService, private router: Router, public appComponent: AppComponent) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.routeParam = params.get('id');
    });
    const token = localStorage.getItem(AppConstants.accessToken);
    if (token) {
      this.httpService.getAuth().subscribe((data: any) => {
        this.appComponent.loggedIn = data.success;
        if (this.appComponent.loggedIn) {
          this.getPageFromServer(this.routeParam);
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

  getPageFromServer(page: string) {
    this.httpService.getPageData(page).subscribe((data: any) => {
      if (data.success) {
        this.editorForm.setValue({
          pageId: this.routeParam,
          editorContent: data.result.contents,
        });
      }
    });
  }

  saveClick() {
    this.httpService.setPageData(this.editorForm.value).subscribe((data: any) => {
      if (data.success) {
        this.router.navigateByUrl("/");
      }
    });
  }
}
