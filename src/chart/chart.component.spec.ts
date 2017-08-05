import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
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

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.dataSets = [testSet1, testSet2];
    component.style = defaultStyle;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
