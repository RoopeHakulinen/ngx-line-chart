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
                    color: '#0051BA'
                },
                yAxis: {
                    color: '#0051BA'
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
                    color: '#1F1F21'
                },
                yAxis: {
                    color: '#575759'
                }
            },
            line: {
                color: 'rgba(87, 87, 89, 0.4)',
                width: 5
            }
        }
    ]
};