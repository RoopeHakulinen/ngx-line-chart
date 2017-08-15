import { Component, Input, OnChanges, OnInit } from '@angular/core';
import deepmerge from 'deepmerge';
import { IChartStyle } from '../chart-style';
import { IDataSet } from '../data-set';
import { defaultStyle } from '../default-style';
import { Utils } from '../utils';

@Component({
  selector: 'ngx-line-chart',
  styleUrls: ['./line-chart.component.scss'],
  templateUrl: './line-chart.component.html'
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input()
  xAxisValues: number[] | number;

  @Input()
  dataSets: IDataSet[];

  @Input()
  style: IChartStyle = {};

  _xAxisValues;

  @Input()
  xLabelFunction: (value: number) => string = (value) => value.toString();

  @Input()
  yLabelFunction: (value: number) => string = (value) => value.toString();

  ngOnInit() {
    this.update();
  }

  ngOnChanges(changes: any) {
    this.update();
    this.dataSets.forEach((dataSet, index) => {
      const dataSetProxy = new Proxy(dataSet, {
        set: (target, prop, value) => {
          target[prop] = value;
          this.update();
          return true;
        }
      });
      this.dataSets[index] = dataSetProxy;
    });
  }

  private update() {
    if (!this.dataSets || this.dataSets.length === 0) {
      throw new Error('No data sets specified.');
    }
    if (this.dataSets.length > 2) {
      throw new Error('Only one or two data sets allowed.');
    }
    Utils.ensureDataSetsHaveSameXValues(this.dataSets);

    if (!this.xAxisValues) {
      this._xAxisValues = Utils.getDefaultXAxis(this.dataSets);
    } else if (typeof this.xAxisValues === 'number') {
      if (this.xAxisValues < 2) {
        throw new Error('xAxisValue can\'t be less than 2 since min and max are required at least for x-axis.');
      }
      this._xAxisValues = Utils.divideXAxisToN(this.xAxisValues, this.dataSets);
    } else {
      this._xAxisValues = [...this.xAxisValues];
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
