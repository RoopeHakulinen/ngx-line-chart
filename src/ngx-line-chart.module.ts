import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [ChartComponent, LineChartComponent],
  exports: [LineChartComponent],
  imports: [
    CommonModule
  ]
})
export class NgxLineChartModule {
}
