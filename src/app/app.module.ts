import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {DialogComponent} from "./dialog/dialog.component";
import {HttpClientModule} from "@angular/common/http";
import { WorkSessionsListComponent } from './work-sessions-list/work-sessions-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DialogComponent,
    WorkSessionsListComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
