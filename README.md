# MyCharts

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Init Application

```bash
# install Angular CLI
npm install -g @angular/cli

# install App
ng new MyCharts
cd MyCharts

# install required packages
## Charts
npm install --save ng2-charts
npm install --save chart.js
## Bootstrap
npm install ngx-bootstrap --save
## FontAwesome
npm install @fortawesome/fontawesome-svg-core
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/angular-fontawesome@*
## TinyMCE
npm install --save tinymce @tinymce/tinymce-angular
```

## Setup Application

```bash
# create and init database
using phpMyAdmin run or import script in backend/install/database.php
# set database connection
complete constants DB_HOST, DB_NAME, DB_USER, DB_PASS in backend/config/config.php
# set API url
replace string returned by method apiURL() of class AppConstants in src/app/app-constants.ts
# build production code
ng build
# deploy app to server
copy dist/<app-name>/* files to public_html folder
copy backend/* folders to public_html folder
```