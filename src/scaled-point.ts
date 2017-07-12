import { IPoint } from './point';

export interface IScaledPoint extends IPoint {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
}
