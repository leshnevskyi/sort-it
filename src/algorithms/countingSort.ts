import type {SortFnContext} from './utils';
import createSortFn from './utils';
import {countDecimalPlaces} from 'utils';

function countingSortAlgorithm<T>(this: SortFnContext<T>) {
  if (typeof this.array[0] !== 'number') throw new Error (
    'Array elements must be of type \'number\' in counting sort'
  );

  const maxDecimalPlaceCount = this.array.reduce((maxDecimalPlaceCount, el) => {
    const decimalPlaceCount = countDecimalPlaces(el as unknown as number);

    return Math.max(maxDecimalPlaceCount, decimalPlaceCount);
  }, 0);

  let prevMaxIndex = 0;
  const initialArray = this.arraySnapshot as unknown as number[];
  const indexFactor = Math.pow(10, maxDecimalPlaceCount);

  const maxIndexes = this.array.reduce<number[]>((elCounts, el) => {
    let index = Math.round(el as unknown as number * indexFactor);
    
    elCounts[index] = (elCounts[index] ?? 0) + 1; 

    return elCounts;
  }, []).map(elCount => {
    const maxIndex = elCount + prevMaxIndex;
    prevMaxIndex = maxIndex;

    return maxIndex;
  });

  initialArray.forEach((el, currIndex) => {
    const replacingElIndex = --maxIndexes[Math.round(el * indexFactor)];

    this.stash(replacingElIndex);
    this.replace(replacingElIndex, currIndex);
  });
}

const countingSort = createSortFn(countingSortAlgorithm);

export default countingSort;