export interface IDataSetStyle {
    circle?: {
        color?: string;
        radius?: number;
    };
    labels?: {
        value?: {
            color?: string;
            fontSize?: number;
        };
        yAxis?: {
            color?: string;
            fontSize?: number;
        };
    };
    line?: {
        color?: string;
        width?: number;
    };
}
