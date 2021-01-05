import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SortableModule } from 'ngx-bootstrap/sortable';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    SortableModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule
     ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
