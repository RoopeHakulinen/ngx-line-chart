# ngx-line-chart
Good-looking, easy-to-use, customizable Angular line chart library for 1 or 2 data sets with separate or common y-axes.

### Features
- 1 or 2 data sets
- Nice-looking styles by default that can be customized
- Produces scalable SVG image
- Each value will be shown on top of the data point
- Only single dependency ([`deepmerge`](https://www.npmjs.com/package/deepmerge)) without any transitive dependencies
- Supported by all mobile and desktop browsers including IE9+ ([Can I use: SVG](http://caniuse.com/#feat=svg))
- AoT-compatible

### Limitations
- No more than 1 or 2 data sets
- X-axis values need to be the same for both data sets
- Labels need to be numbers (though you can use `xLabelFunction` or `yLabelFunction` to specify how they should be shown) 

## Installation
To install this library, run:

```bash
$ npm install ngx-line-chart --save
```

and then add the module in `AppModule` as an imported module:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { NgxLineChartModule } from 'ngx-line-chart';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxLineChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Usage
Module only contains single component, called `ngx-line-chart` to be used in the templates:

```html
<ngx-line-chart []></ngx-line-chart>
```

See explanation for inputs below.

### Inputs
| Input          | Type                      | Example value                                                                | Description                                                                                                                                                                                                       |
|----------------|---------------------------|------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dataSets       | IDataSet[]                | [{name: 'likes', points: [{x: 10, y: 100}, {x: 20, y: 500}, {x: 50, y: 40}]] | Array of 1 or 2 data sets each containing a name and the actual data points (x and y as numbers). There data sets will be used to determine x-axis values along with the corresponding y-axis for each data set.  |
| xLabelFunction | (value: number) => string | (value: number) => value.toString() (this is the default)                    | This function will be called for each value of the x-axis labels for it to be formatted. Default function shows the values as they are. You may use this to format values as for example dates.                   |
| xLabelFunction | (value: number) => string | (value: number) => value.toString() (this is the default)                    | This function will be called for each value of the y-axis labels for it to be formatted. Default function shows the values as they are.                                                                           |
| style          | IChartStyle               | -                                                                            | Explained below.                                                                                                                                                                                                  |

The `axes` input will be fixed in the future to work as intended. It can be skipped for now.

### Styles
Layout level section explains how to specify the size for the chart where as the details allow you to specify the colors and widths used within the chart.

#### Layout level
The most important thing to note is that the line chart will always fulfill the element it is inserted into. What this means in practice is that if you have something like

```html
<div style="width: 600px; height: 400px;">
    <ngx-line-chart ...></ngx-line-chart>
</div>
```

The chart will now be 600px x 400px.

#### Chart details
Details of the chart can be fine tuned also with `style` input. The options for this include:


## Future
Plan is to generalize the library as going forward. Things to be included contain at least:
- Calculate the text-size and align stuff on the image based on it
- More styling options (positioning of stuff)
- More than two data sets
- Custom y-axis splitting (now just 0%-50%-100%)
- Relaxing the common x-axis value requirement for different data sets

Pull requests would be greatly appreciated for any of these or any other features you feel would be useful.

## Development
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
