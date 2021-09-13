import {defaultCompareFn} from './utils';

const selectionSort = <T>(
  [...arr]: T[], 
  compareFn: CompareFn<T> = defaultCompareFn,
  logChanges: boolean = false,
) => {
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    let minElIndex = i + 1;

    for (let j = i + 2; j < len; j++) {
      if (compareFn(arr[j], arr[minElIndex]) < 0) minElIndex = j;
    }

    if (compareFn(arr[minElIndex], arr[i]) < 0) {
      [arr[i], arr[minElIndex]] = [arr[minElIndex], arr[i]];
    }
  }

  return arr;
}

export default selectionSort;