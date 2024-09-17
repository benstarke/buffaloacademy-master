// import 'zone.js';  // Instead of 'zone.js/dist/zone'

// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideRouter, Routes } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http'; // Add this import
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { provideToastr } from 'ngx-toastr';
// import { importProvidersFrom } from '@angular/core';
// import { ToastrModule } from 'ngx-toastr';

// // Ensure jQuery is available globally
// import * as jQuery from 'jquery';
// const $ = jQuery.noConflict(true);
// (window as any).$ = $;
// (window as any).jQuery = $;

// // app modules/sub-systems routes
// import { frontendRoutes } from './app/routes/frontends/frontendsrouting.module';
// import { studentRoutes } from './app/routes/student/studentrouting.module';
// import { publicsRoutes } from './app/routes/publics/publicsrouting.module';
// import { dashboardRoutes } from './app/routes/dashboard/dashboardrouting.module';
// import { backendRoutes } from './app/routes/backend/backendrouting.module';

// const appRoutes: Routes = [
//   ...frontendRoutes,
//   ...backendRoutes,
//   ...dashboardRoutes,
//   ...publicsRoutes,
//   ...studentRoutes,
// ];

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(appRoutes),
//     provideHttpClient(), // Ensure provideHttpClient is included
//     provideAnimations(), // required animations providers
//     provideToastr(), // Toastr providers
//   ],
// }).catch((err) => console.error(err));






import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Add this import
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';


// app modules/sub-systems routes
import { frontendRoutes } from './app/routes/frontends/frontendsrouting.module';
import { studentRoutes } from './app/routes/student/studentrouting.module';
import { publicsRoutes } from './app/routes/publics/publicsrouting.module';
// import { dashboardRoutes } from './app/routes/dashboard/dashboardrouting.module';
import { backendRoutes } from './app/routes/backend/backendrouting.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const appRoutes: Routes = [
  ...frontendRoutes,
  ...backendRoutes,
  // ...dashboardRoutes,
  ...publicsRoutes,
  ...studentRoutes,
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(), provideAnimationsAsync(), // Ensure provideHttpClient is included
    provideAnimations(), // required animations providers
    provideToastr(), provideAnimationsAsync(), // Toastr providers
    // provideToastr({
    //   timeOut: 1000,
    //   positionClass: 'toast-top-right',
    // }),
    // importProvidersFrom(ToastrModule.forRoot({
    //   timeOut: 1000,
    //   positionClass: 'toast-top-right',
    // })),
  ],
}).catch((err) => console.error(err));

