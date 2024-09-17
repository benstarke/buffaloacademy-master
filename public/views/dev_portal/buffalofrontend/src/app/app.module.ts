import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DxToastModule } from 'devextreme-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  DxActionSheetModule,  DxTemplateModule, DxHtmlEditorModule, DxTabsModule,DxButtonModule, DxFormModule, DxCheckBoxModule, DxContextMenuModule, DxDataGridModule, DxDateBoxModule, DxFileUploaderModule, DxMenuModule, DxNumberBoxModule, DxPopupModule, DxProgressBarModule, DxRadioGroupModule, DxScrollViewModule, DxSelectBoxModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule, DxTreeListModule } from 'devextreme-angular';
import { DxMenuComponent } from 'devextreme-angular/ui/menu';

// import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http'; // Add this import
import { TimeAgoPipe } from './views/publics/blog-list/time-ago.pipe'; 

// Here we import the modules
import { FrontendsModule } from './module/frontends/frontends.module';
import { BackendModule } from './module/backend/backend.module';
// import { DashboardModule } from './module/dashboard/dashboard.module';
import { PublicsModule } from './module/publics/publics.module';
import { StudentModule } from './module/student/student.module';


// Import PrimeNG modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


import { FrontendsRoutingModule } from './routes/frontends/frontendsrouting.module';
import { PublicsRoutingModule } from './routes/publics/publicsrouting.module';
// import { DashboardRoutingModule } from './routes/dashboard/dashboardrouting.module';

import { SanitizeHtmlPipe } from './views/dashboard/blogmodule/blog/blogmgmt/sanitize-html.pipe';

@NgModule({
  declarations: [
  //  AppComponent,
   TimeAgoPipe,
   SanitizeHtmlPipe 
  ],
  imports: [
    RouterModule,// Use RouterModule.forRoot
    BrowserModule,
    DxToastModule,
    DxMenuComponent,

    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ // ToastrModule added
      timeOut: 1000,
      // positionClass: 'toast-top-right',
      // preventDuplicates: true,
    }),
    // HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FrontendsModule,
    BackendModule,
    // DashboardModule,
    PublicsModule,
    StudentModule,

    FrontendsRoutingModule,
    PublicsRoutingModule,
    // DashboardRoutingModule,

    DxCheckBoxModule,
    DxFormModule,
    DxTabsModule,
    DxActionSheetModule,
    DxFileUploaderModule,
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxContextMenuModule,
    DxTextBoxModule,
    DxTreeListModule,
    DxDataGridModule,
    DxPopupModule,
    DxButtonModule,
    DxDateBoxModule,
    DxRadioGroupModule,
    DxTagBoxModule,
    DxScrollViewModule,
    DxProgressBarModule,
    DxFormModule,
    DxTemplateModule,
    DxHtmlEditorModule,


    // Include PrimeNG modules here
    TableModule,
    ButtonModule

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    FrontendsModule,
    FrontendsRoutingModule,
    TimeAgoPipe,
    SanitizeHtmlPipe 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }