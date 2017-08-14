import { IChartStyle } from './chart-style';

export const defaultStyle: IChartStyle = {
  dataSetStyles: [
    {
      circle: {
        color: '#0051BA',
        radius: 4
      },
      labels: {
        value: {
          color: '#0051BA',
          fontSize: 14
        },
        yAxis: {
          color: '#0051BA',
          fontSize: 14
        }
      },
      line: {
        color: 'rgba(0, 81, 186, 0.4)',
        width: 5
      }
    },
    {
      circle: {
        color: '#1F1F21',
        radius: 4
      },
      labels: {
        value: {
          color: '#1F1F21',
          fontSize: 14
        },
        yAxis: {
          color: '#575759',
          fontSize: 14
        }
      },
      line: {
        color: 'rgba(87, 87, 89, 0.4)',
        width: 5
      }
    }
  ],
  xAxis: {
    labels: {
      color: '#8C8C8E',
      fontSize: 18,
      angle: 60
    }
  }
};
