import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ChartsComponent } from './charts/charts.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { InputComponent } from './input/input.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SettingsComponent } from './settings/settings.component';
import { EditpageComponent } from './editpage/editpage.component';
import { ExportComponent } from './export/export.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "contact", component: ContactComponent },
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent },
  { path: "input", component: InputComponent },
  { path: "charts", component: ChartsComponent },
  { path: "list", component: ListComponent },
  { path: "logout", component: LogoutComponent },
  { path: "settings", component: SettingsComponent },
  { path: "export", component: ExportComponent },
  { path: "editpage/:id", component: EditpageComponent },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
