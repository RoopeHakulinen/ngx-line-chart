import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from '../chart/chart.component';

import { LineChartComponent } from './line-chart.component';
import { defaultStyle } from '../default-style';

const testSet1 = {
  name: 'test set 1',
  points: [
    { x: 0, y: 100 },
    { x: 1, y: 200 },
    { x: 2, y: 300 },
  ]
};
const testSet2 = {
  name: 'test set 2',
  points: [
    { x: 0, y: 100 },
    { x: 4, y: 200 },
    { x: 8, y: 300 },
  ]
};

describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LineChartComponent, ChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    describe('dataSets', () => {
      it('should throw if not specified', () => {
        expect(() => component.ngOnInit()).toThrowError('No data sets specified.');
      });
      it('should throw if is an empty array', () => {
        component.dataSets = [];
        expect(() => component.ngOnInit()).toThrowError('No data sets specified.');
      });
      it('should throw if contains too many items', () => {
        component.dataSets = [null, null, null];
        expect(() => component.ngOnInit()).toThrowError('Only one or two data sets allowed.');
      });
      it('should throw if data sets contain different sets of x values', () => {
        component.dataSets = [
          testSet1,
          testSet2
        ];
        expect(() => component.ngOnInit()).toThrowError(
          'Unfortunately the data sets need to have common, same-way ordered set of x values.'
          + ' If either data set is missing some point, provide it as null y value. Sorry for inconvenience');
      });
    });

    describe('axes', () => {
      describe('constructs default axes', () => {
        xit('if only 1 data set is provided', () => {
          component.dataSets = [testSet1];
          component.ngOnInit();
          expect(component.axes).toBe([]);
        });
        xit('if 2 data sets are provided', () => {
          component.dataSets = [testSet1, testSet2];
          component.ngOnInit();
          expect(component.axes).toBe([]);
        });
      });
    });

    describe('label functions', () => {
      it('xLabelFunction should default to conversion to string', () => {
        expect(component.xLabelFunction(1)).toBe('1');
      });
      it('yLabelFunction should default to conversion to string', () => {
        expect(component.yLabelFunction(2)).toBe('2');
      });
    });

    describe('styles', () => {
      it('if none provided, use defaults', () => {
        component.dataSets = [testSet1];
        component.ngOnInit();
        expect(component.style).toEqual(defaultStyle);
      });
      it('if provided, merge with the defaults', () => {
        component.dataSets = [testSet1];
        component.style = {
          xAxis: {
            labels: {
              color: 'orange'
            }
          }
        };
        component.ngOnInit();
        const expectedStyles = Object.assign({}, defaultStyle);
        expectedStyles.xAxis.labels.color = 'orange';
        expect(component.style).toEqual(expectedStyles);
      });
    });
  });
});
