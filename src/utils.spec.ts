import { Utils } from './utils';

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
      expect(Utils.findMinAndMax([0, 1, 2])).toEqual({ min: 0, max: 2});
      expect(Utils.findMinAndMax([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual({ min: 0, max: 10});
      expect(Utils.findMinAndMax([199, 5, 20, -111, 80])).toEqual({ min: -111, max: 199});
      expect(Utils.findMinAndMax([5, 5])).toEqual({ min: 5, max: 5});
      expect(Utils.findMinAndMax([5])).toEqual({ min: 5, max: 5});
    });
  });
  describe('scaleValueBetween0And1', () => {
    it('should return correct value for each set', () => {
      expect(Utils.scaleValueBetween0And1(25, {min: 0, max: 100}, 'x')).toBe(0.25);
      expect(Utils.scaleValueBetween0And1(50, {min: 0, max: 100}, 'x')).toBe(0.5);
      expect(Utils.scaleValueBetween0And1(75, {min: 0, max: 100}, 'x')).toBe(0.75);
    });
  });
});
