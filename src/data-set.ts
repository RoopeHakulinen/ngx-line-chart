import { IPoint } from './point';

export interface IDataSet {
  name: string;
  axis?: string;
  points: IPoint[];
}
