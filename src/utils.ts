export namespace Utils {
  export function scaleValueBetween0And1(value: number, minAndMax: { min: number, max: number }, type: string) {
    let min = 0;
    if (type === 'x') {
      min = minAndMax.min;
    }
    let divider = minAndMax.max - min;
    if (divider === 0) {
      return 0;
    }
    return (value - min) / divider;
  }

  export function findMinAndMax(values: number[]) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { min, max };
  }

  export function findMiddleOfMinAndMax(values: number[]) {
    const minAndMax = findMinAndMax(values);
    return Math.floor((minAndMax.max - minAndMax.min) / 2 + minAndMax.min);
  }
}
