import { Component, Input } from '@angular/core';
import { IChartStyle } from '../chart-style';
import { IDataSet } from '../data-set';
import { IPoint } from '../point';
import { IScaledPoint } from '../scaled-point';
import { Utils } from '../utils';

@Component({
  selector: 'ngx-chart',
  styleUrls: ['./chart.component.scss'],
  templateUrl: './chart.component.html'
})
export class ChartComponent {
  @Input()
  dataSets: IDataSet[];

  @Input()
  xAxisValues: number[];

  @Input()
  xLabelFunction: (value: number) => string;

  @Input()
  yLabelFunction: (value: number) => string;

  @Input()
  style: IChartStyle;

  width = 800;
  height = 500;
  padding = 100;

  getYAxisValues(setIndex: number) {
    if (setIndex >= this.dataSets.length) {
      return [];
    }
    const scaledPoints = this.getScaledPoints(this.dataSets[setIndex].points)
      .sort((a, b) => a.originalY - b.originalY);
    const min = scaledPoints[0];
    let mid = scaledPoints[Math.floor(scaledPoints.length / 2)];
    let max = scaledPoints[scaledPoints.length - 1];
    let midLabelValue = Utils.findMiddleOfMinAndMax(this.dataSets[setIndex].points.map((point) => point.y));
    if (max.y === min.y) {
      midLabelValue = 0.5;
      mid.y = 0.5;
      mid.originalY = 0.5;
      max.y = this.padding;
      max.originalY = 1;
    }
    return [
      {
        label: this.getYLabel(0),
        y: this.height - this.padding
      },
      {
        ...mid,
        label: this.getYLabel(midLabelValue),
        y: this.height / 2
      },
      {
        ...max,
        label: this.getYLabel(max.originalY)
      }
    ];
  }

  getXAxisValues() {
    return this.getScaledPoints(this.xAxisValues.map(value => ({ x: value, y: 0 })))
      .map(scaledPoint => ({
          label: this.getXLabel(scaledPoint.originalX),
          x: scaledPoint.x
        })
      );
  }

  pointsToPath(scaledCoordinates: IScaledPoint[]) {
    const startPoint = scaledCoordinates[0];
    const startPointMove = `M ${startPoint.x} ${startPoint.y}`;
    const path = scaledCoordinates.slice(1).map((point) => `L ${point.x} ${point.y}`).join(' ');
    return `${startPointMove} ${path}`;
  }

  getScaledPoints(points: IPoint[], asd = false): IScaledPoint[] {
    const minAndMaxX = Utils.findMinAndMax(points.map((point) => point.x));
    const minAndMaxY = Utils.findMinAndMax(points.map((point) => point.y));
    return points.map((point) => {
        let scaledX = Utils.scaleValueBetween0And1(point.x, minAndMaxX, 'x');
        let scaledY = Utils.scaleValueBetween0And1(point.y, minAndMaxY, 'y');
        return {
          originalX: point.x,
          originalY: point.y,
          x: scaledX * (this.width - 2 * this.padding) + this.padding,
          y: this.height - ((scaledY * (this.height - 2 * this.padding)) + this.padding),
        };
      }
    ).sort((a, b) => a.originalX - b.originalX);
  }

  private getXLabel(x: number) {
    return this.xLabelFunction ? this.xLabelFunction(x) : x;
  }

  private getYLabel(y: number) {
    return this.yLabelFunction ? this.yLabelFunction(y) : y;
  }
}
