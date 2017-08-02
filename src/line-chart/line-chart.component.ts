import { Component, Input, OnInit } from '@angular/core';
import deepmerge from 'deepmerge';
import { IAxis } from '../axis';
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
    public axes: IAxis[];

    @Input()
    public dataSets: IDataSet[];

    @Input()
    public style: IChartStyle = {};

    private static getDefaultAxis(dataSets: IDataSet[]) {
        // Find min and max of all data sets and then calculate axis min and max from those
        const firstSetValues = dataSets[0].points.map((point) => point.x);
        const firstSetMin = Math.min(...firstSetValues);
        const firstSetMax = Math.max(...firstSetValues);
        if (dataSets.length === 1) {
            return LineChartComponent.deduceMinAndMaxYAxisValueFromMinAndMaxPointValues(firstSetMin, firstSetMax);
        }

        const secondSetValues = dataSets[1].points.map((point) => point.x);
        const secondSetMin = Math.min(...secondSetValues);
        const secondSetMax = Math.max(...secondSetValues);

        const totalMinValue = Math.min(firstSetMin, secondSetMin);
        const totalMaxValue = Math.min(firstSetMax, secondSetMax);

        return LineChartComponent.deduceMinAndMaxYAxisValueFromMinAndMaxPointValues(totalMinValue, totalMaxValue);
    }

    private static deduceMinAndMaxYAxisValueFromMinAndMaxPointValues(min: number, max: number) {
        return {
            max,
            min
        };
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

    private static ensureAxisDoMatchToXValuesOfPoints(axes: IAxis[], dataSets: IDataSet[]) {
        const axeNames = axes.map((axis) => axis.name);
        dataSets.forEach((dataSet) => {
            if (!axeNames.includes(dataSet.axis)) {
                throw new Error(`Axis ${dataSet.axis} is not defined as axes (${axeNames.join(', ')}).`);
            }
        });
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
        if (!this.axes) {
            this.axes = [LineChartComponent.getDefaultAxis(this.dataSets)];
        } else {
            LineChartComponent.ensureAxisDoMatchToXValuesOfPoints(this.axes, this.dataSets);
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
