import { IDataSet } from './data-set';

export namespace Utils {
  export function scaleValueBetween0And1(value: number, minAndMax: { min: number, max: number }, type: string) {
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

  export function findMinAndMax(values: number[]) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { min, max };
  }

  export function findMiddleOfMinAndMax(values: number[]) {
    const minAndMax = findMinAndMax(values);
    return Math.floor((minAndMax.max - minAndMax.min) / 2 + minAndMax.min);
  }

  export function getDefaultXAxis(dataSets: IDataSet[]) {
    return dataSets[0].points.map((point) => point.x);
  }

  export function ensureDataSetsHaveSameXValues(dataSets: IDataSet[]) {
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

  export function divideXAxisToN(n: number, dataSets: IDataSet[]) {
    const points = dataSets[0].points;
    const firstPointX = points[0].x;
    const lastPointX = points[points.length - 1].x;

    const result = [];
    result.push(firstPointX);

    const range = lastPointX - firstPointX;
    for (let i = 1; i < n - 1; ++i) {
      result.push(range / (n - 1) * i + firstPointX);
    }

    result.push(lastPointX);
    return result;
  }
}
