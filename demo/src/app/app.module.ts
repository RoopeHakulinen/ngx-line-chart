import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxLineChartModule } from 'ngx-line-chart';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxLineChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
