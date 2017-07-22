import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAxis } from '../axis';
import { IChartStyle } from '../chart-style';
import { IDataSet } from '../data-set';
import { IPoint } from '../point';
import { IScaledPoint } from '../scaled-point';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-chart',
    styleUrls: ['./chart.component.scss'],
    templateUrl: './chart.component.html'
})
export class ChartComponent {
    private static scaleValueBetween0And1(value: number, minAndMax: { min: number, max: number }, type: string) {
        let min = 0;
        if (type === 'x') {
            min = minAndMax.min;
        }
        let divider = minAndMax.max - min;
        if (divider === 0) {
            return 0;
        }
        return (value - min) / divider;
    }

    private static findMinAndMax(values: number[]) {
        const min = Math.min(...values);
        const max = Math.max(...values);
        return { min, max };
    }

    private static findMiddle(values: number[]) {
        const minAndMax = ChartComponent.findMinAndMax(values);
        return minAndMax.max / 2;
    }

    @Input()
    public dataSets: IDataSet[];

    @Input()
    public axes: IAxis[];

    @Input()
    public xLabelFunction: (value: number) => string;

    @Input()
    public yLabelFunction: (value: number) => string;

    @Input()
    public style: IChartStyle;

    public width = 800;
    public height = 500;
    public padding = 40;

    public getYAxisValues(setIndex: number) {
        if (setIndex >= this.dataSets.length) {
            return [];
        }
        const scaledPoints = this.getScaledPoints(this.dataSets[setIndex].points)
            .sort((a, b) => a.originalY - b.originalY);
        const mid = scaledPoints[Math.floor(scaledPoints.length / 2)];
        const max = scaledPoints[scaledPoints.length - 1];
        const midLabelValue = ChartComponent.findMiddle(this.dataSets[setIndex].points.map((point) => point.y));
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

    public getXAxisValues() {
        return this.getScaledPoints(this.dataSets[0].points).map((scaledPoint) => {
                return {
                    label: this.getXLabel(scaledPoint.originalX),
                    x: scaledPoint.x
                };
            }
        );
    }

    public pointsToPath(scaledCoordinates: IScaledPoint[]) {
        const startPoint = scaledCoordinates[0];
        const startPointMove = `M ${startPoint.x} ${startPoint.y}`;
        const path = scaledCoordinates.slice(1).map((point) => `L ${point.x} ${point.y}`).join(' ');
        return `${startPointMove} ${path}`;
    }

    public getScaledPoints(points: IPoint[]): IScaledPoint[] {
        const minAndMaxX = ChartComponent.findMinAndMax(points.map((point) => point.x));
        const minAndMaxY = ChartComponent.findMinAndMax(points.map((point) => point.y));
        return points.map((point) => {
                let scaledY = ChartComponent.scaleValueBetween0And1(point.y, minAndMaxY, 'y');
                let scaledX = ChartComponent.scaleValueBetween0And1(point.x, minAndMaxX, 'x');
                return {
                    originalX: point.x,
                    originalY: point.y,
                    x: Math.max(
                        scaledX * (this.width - this.padding),
                        this.padding
                    ),
                    y:
                        Math.min(
                            Math.max(
                                this.height - scaledY * this.height,
                                this.padding
                            ),
                            this.height - this.padding
                        )
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
