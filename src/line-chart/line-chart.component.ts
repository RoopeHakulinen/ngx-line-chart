import { Component, Input, OnInit } from '@angular/core';
import deepmerge from 'deepmerge';
import { IChartStyle } from '../chart-style';
import { IDataSet } from '../data-set';
import { defaultStyle } from '../default-style';

@Component({
  selector: 'ngx-line-chart',
  styleUrls: ['./line-chart.component.scss'],
  templateUrl: './line-chart.component.html'
})
export class LineChartComponent implements OnInit {
  @Input()
  public xAxisValues: number[] | number;

  @Input()
  public dataSets: IDataSet[];

  @Input()
  public style: IChartStyle = {};

  private static getDefaultXAxis(dataSets: IDataSet[]) {
    return dataSets[0].points.map((point) => point.x);
  }

  private static ensureDataSetsHaveSameXValues(dataSets: IDataSet[]) {
    if (dataSets.length === 1) {
      return;
    }
    const error = new Error('Unfortunately the data sets need to have common, same-way ordered set of x values.'
      + ' If either data set is missing some point, provide it as null y value. Sorry for inconvenience');
    const firstSetValues = dataSets[0].points.map((point) => point.x);
    const secondSetValues = dataSets[1].points.map((point) => point.x);
    if (firstSetValues.length !== secondSetValues.length) {
      throw error;
    }
    for (let i = 0; i < firstSetValues.length; ++i) {
      if (firstSetValues[i] !== secondSetValues[i]) {
        throw error;
      }
    }
  }

  private static divideXAxisToN(n: number, dataSets: IDataSet[]) {
    const points = dataSets[0].points;
    const firstPointX = points[0].x;
    const lastPointX = points[points.length - 1].x;
    const result = [];
    result.push(firstPointX);

    const range = lastPointX - firstPointX;
    for (let i = 1; i < n; ++i) {
      result.push(range / n * i + firstPointX);
    }

    result.push(lastPointX);
    return result;
  }

  @Input()
  public xLabelFunction: (value: number) => string = (value) => value.toString();

  @Input()
  public yLabelFunction: (value: number) => string = (value) => value.toString();

  public ngOnInit() {
    if (!this.dataSets || this.dataSets.length === 0) {
      throw new Error('No data sets specified.');
    }
    if (this.dataSets.length > 2) {
      throw new Error('Only one or two data sets allowed.');
    }
    LineChartComponent.ensureDataSetsHaveSameXValues(this.dataSets);
    if (!this.xAxisValues) {
      this.xAxisValues = LineChartComponent.getDefaultXAxis(this.dataSets);
    } else if (typeof this.xAxisValues === 'number') {
      if (this.xAxisValues < 2) {
        throw new Error('xAxisValues can\'t be less than 2 since min and max are required at least for x-axis.');
      }
      this.xAxisValues = LineChartComponent.divideXAxisToN(this.xAxisValues, this.dataSets);
    }
    this.applyDefaultStyle();
  }

  private applyDefaultStyle() {
    this.style = deepmerge(
      defaultStyle,
      this.style
    );
  }
}
