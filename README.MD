# ngx-line-chart
Good-looking, easy-to-use, customizable Angular line chart library for 1 or 2 data sets with separate or common y-axes.

![Chart 1](images/chart-1.png)
![Chart 2](images/chart-2.png)

### Features
- 1 or 2 data sets
- Nice-looking styles by default that can be customized
- Produces scalable SVG image
- Each value will be shown on top of the data point
- Only single dependency ([`deepmerge`](https://www.npmjs.com/package/deepmerge)) without any transitive dependencies
- Supported by all mobile and desktop browsers including IE9+ ([Can I use: SVG](http://caniuse.com/#feat=svg))
- AoT-compatible

### Limitations
- Only 1 or 2 data sets allowed
- X-axis values need to be the same for both data sets
- X and Y values need to be numbers, though you can present them as any string with `xLabelFunction` or `yLabelFunction` 

## Installation
To install this library, run:

```bash
$ npm install ngx-line-chart # Add --save if using npm version < 5
```

and then add the module in `AppModule` as an imported module:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import the module
import { NgxLineChartModule } from 'ngx-line-chart';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxLineChartModule // Add module here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Now a component with selector `ngx-line-chart` is registered and is usable in the templates.

## Usage
Module only contains single component, called `ngx-line-chart` to be used in the templates:

```html
<ngx-line-chart [dataSets]="myDataSets" [xLabelFunction]="formXAxisValue.bind(this)"></ngx-line-chart>
```

```typescript
export class MyComponent {
    myDataSets = [{
        name: 'likes',
        points: [
            {x: 10, y: 100},
            {x: 20, y: 500}
        ]
    }];
    
    formatXAxisValue(value: number) {
        return `Value ${value}`;
    }
}
```

See below for details about all of the inputs.

### Inputs
| Input          | Type                      | Example value                                                                | Description                                                                                                                                                                                                                                                                |
|----------------|---------------------------|------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dataSets       | IDataSet[]                | [{name: 'likes', points: [{x: 10, y: 100}, {x: 20, y: 500}, {x: 50, y: 40}]] | Array of 1 or 2 data sets each containing a name and the actual data points (x and y as numbers). There data sets will be used to determine x-axis values along with the corresponding y-axis for each data set.                                                           |
| xLabelFunction | (value: number) => string | (value: number) => value.toString() (this is the default)                    | This function will be called for each value of the x-axis labels for it to be formatted. Default function shows the values as they are. You may use this to format values as for example dates. *See [example](#usage) above for how to pass a method (`bind` is needed)*. |
| yLabelFunction | (value: number) => string | (value: number) => value.toString() (this is the default)                    | This function will be called for each value of the y-axis labels for it to be formatted. Default function shows the values as they are.                                                                                                                                    |
| xAxisValues    | number[] | number         | [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] or 10                           | If an array is provided, the values in array will be used for x-axis. If number is provided, first data set is used to distribute x-axis values linearly over the range of values. If none is provided, all x-axis values of first data set will be used.                  |
| style          | IChartStyle               |                                                                              | See [Chart details](#chart-details) below.                                                                                                                                                                                                                                 |


### Styles
Layout level section explains how to specify the size for the chart where as the details allow you to specify the colors and widths used within the chart.

#### Layout level
The most important thing to note is that the line chart will always fulfill the element it is inserted into. What this means in practice is that if you have something like

```html
<div style="width: 600px; height: 400px;">
    <ngx-line-chart ...></ngx-line-chart>
</div>
```

The chart will now be 600px x 400px as it fulfills the container. Please note that the container doesn't of course need to have size specified as pixels but instead it can be declared as percentages etc.

#### Chart details
Details of the chart can be fine tuned with `style` input. [default-style.ts](src/default-style.ts) gives a good example on how the object passed should look like:

```typescript
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
          fontSize: 18
        },
        yAxis: {
          color: '#0051BA',
          fontSize: 18
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
          fontSize: 18
        },
        yAxis: {
          color: '#575759',
          fontSize: 18
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
      fontSize: 24,
      angle: 60
    }
  }
};
``` 

These are also the default values and can be partially or fully altered by providing the input as follows:

```html
<ngx-line-chart [style]="chartStyles"></ngx-line-chart>
``` 

```typescript
export class MyComponent {
    chartStyles = {
        xAxis: {
            labels: {
                color: 'red'
            }
        }
    }
}
```

This will now merge the specified red color for x-axis labels with the default styles. 

For colors all the ways possible to declare a color in CSS will work. This includes:
- common color names such as `red` and `blue`
- RGB values as hexa and integer versions such as `#FFFFFF`, `#242424`, `rgb(255, 255, 255)` and `rgba(60, 60, 60, 0.5)`
- HSL colors such as `hsl(120, 100%, 50%)` and `hsla(120, 100%, 25%, 0.4)`


## Future
Plan is to generalize the library as going forward. Things to be included contain at least:
- Calculate the text-size and align stuff on the image based on it
- More styling options (positioning of stuff)
- More than two data sets
- Custom y-axis splitting (now just 0%-50%-100%)
- Relaxing the common x-axis value requirement for different data sets

Pull requests would be greatly appreciated for any of these or any other features you feel would be useful.

## Development
To run the demo project:
1. Run `npm run build` in the root directory to generate `dist/` (`npm install` first, of course)
2. Go to `demo/` and run `npm install`
3. Go to root and run `npm run prepare-demo`. This copies `dist/` folder to the `node_modules/` of demo application. This is essentially what `npm link` would achieve with symbolic link, but there's a [known problem](https://github.com/angular/angular/issues/15763) with Angular and `npm link`.
4. Go back to the `demo/` and start dev server with `npm start`

So to conclude:
```bash
npm install
npm run build
cd demo
npm install
cd ..
npm run prepare-demo
cd demo
npm start
```

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License
MIT © [Roope Hakulinen](mailto:roope.hakulinen@gmail.com)
