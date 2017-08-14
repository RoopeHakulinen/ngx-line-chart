import { IDataSetStyle } from './data-set-style';

export interface IChartStyle {
  dataSetStyles?: IDataSetStyle[];
  xAxis?: {
    labels?: {
      color?: string;
      fontSize?: number;
      angle?: number;
    };
  };
}
