import { Utils } from './utils';

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
const testSet3 = {
  name: 'test set 3',
  points: [
    { x: 4, y: 200 },
    { x: 8, y: 300 },
    { x: 12, y: 300 },
    { x: 16, y: 300 },
    { x: 20, y: 300 },
    { x: 24, y: 300 },
    { x: 28, y: 300 },
    { x: 32, y: 300 },
    { x: 36, y: 300 },
    { x: 40, y: 300 },
  ]
};

describe('Utils', () => {
  describe('findMiddleOfMinAndMax', () => {
    it('should return the middle value of min and max', () => {
      expect(Utils.findMiddleOfMinAndMax([0, 1, 2])).toBe(1);
      expect(Utils.findMiddleOfMinAndMax([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(5);
      expect(Utils.findMiddleOfMinAndMax([0, 10])).toBe(5);
      expect(Utils.findMiddleOfMinAndMax([10, 20])).toBe(15);
      expect(Utils.findMiddleOfMinAndMax([10, 110])).toBe(60);
    });
  });

  describe('findMinAndMax', () => {
    it('should return the min and max of array', () => {
      expect(Utils.findMinAndMax([0, 1, 2])).toEqual({ min: 0, max: 2 });
      expect(Utils.findMinAndMax([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual({ min: 0, max: 10 });
      expect(Utils.findMinAndMax([199, 5, 20, -111, 80])).toEqual({ min: -111, max: 199 });
      expect(Utils.findMinAndMax([5, 5])).toEqual({ min: 5, max: 5 });
      expect(Utils.findMinAndMax([5])).toEqual({ min: 5, max: 5 });
    });
  });

  describe('scaleValueBetween0And1', () => {
    it('should return correct values for basic values', () => {
      expect(Utils.scaleValueBetween0And1(25, { min: 0, max: 100 }, 'x')).toBe(0.25);
      expect(Utils.scaleValueBetween0And1(50, { min: 0, max: 100 }, 'x')).toBe(0.5);
      expect(Utils.scaleValueBetween0And1(75, { min: 0, max: 100 }, 'x')).toBe(0.75);
      expect(Utils.scaleValueBetween0And1(25, { min: 0, max: 100 }, 'y')).toBe(0.25);
      expect(Utils.scaleValueBetween0And1(50, { min: 0, max: 100 }, 'y')).toBe(0.5);
      expect(Utils.scaleValueBetween0And1(75, { min: 0, max: 100 }, 'y')).toBe(0.75);

      expect(Utils.scaleValueBetween0And1(25, { min: 10, max: 100 }, 'x')).toBeCloseTo(0.166, 2);
      expect(Utils.scaleValueBetween0And1(50, { min: 10, max: 100 }, 'x')).toBeCloseTo(0.444, 2);
      expect(Utils.scaleValueBetween0And1(75, { min: 10, max: 100 }, 'x')).toBeCloseTo(0.722, 2);
      expect(Utils.scaleValueBetween0And1(25, { min: 10, max: 100 }, 'y')).toBe(0.25);
      expect(Utils.scaleValueBetween0And1(50, { min: 10, max: 100 }, 'y')).toBe(0.5);
      expect(Utils.scaleValueBetween0And1(75, { min: 10, max: 100 }, 'y')).toBe(0.75);
    });
  });

  describe('getDefaultXAxis', () => {
    it('should return the x values of first data set', () => {
      expect(Utils.getDefaultXAxis([testSet1])).toEqual([0, 1, 2]);
      expect(Utils.getDefaultXAxis([testSet1, testSet2])).toEqual([0, 1, 2]);
      expect(Utils.getDefaultXAxis([testSet3])).toEqual([4, 8, 12, 16, 20, 24, 28, 32, 36, 40]);
    });
  });

  describe('ensureDataSetsHaveSameXValues', () => {
    describe('should not throw', () => {
      it('if only one data set', () => {
        Utils.ensureDataSetsHaveSameXValues([testSet1]);
      });
      it('if both data sets are the same', () => {
        Utils.ensureDataSetsHaveSameXValues([testSet1, testSet1]);
      });
      it('if both data sets have the same x-axis values', () => {
        const set1 = Object.assign({}, testSet1);
        // Multiply x values by 4 to match the test set 2
        set1.points = set1.points.map(item => ({ x: item.x * 4, y: item.y }));
        Utils.ensureDataSetsHaveSameXValues([set1, testSet2]);
      });
    });
    describe('should throw', () => {
      it('if the two data sets do not match by x values', () => {
        expect(() => Utils.ensureDataSetsHaveSameXValues([testSet1, testSet2])).toThrowError(
          'Unfortunately the data sets need to have common, same-way ordered set of x values.'
          + ' If either data set is missing some point, provide it as null y value. Sorry for inconvenience'
        );
      });
    });
  });

  describe('divideXAxisToN', () => {
    it('divides correctly', () => {
      expect(Utils.divideXAxisToN(3, [testSet1])).toEqual([0, 1, 2]);
      expect(Utils.divideXAxisToN(3, [testSet2])).toEqual([0, 4, 8]);
      expect(Utils.divideXAxisToN(5, [testSet3])).toEqual([4, 13, 22, 31, 40]);
    });
  });
});
