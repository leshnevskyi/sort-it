import {defaultCompareFn} from './utils';

const selectionSort = <T>(
  [...arr]: T[], 
  compareFn: CompareFn<T> = defaultCompareFn,
  logChanges: boolean = false,
): T[] | [T[], ChangeLog<T>] => {
  const len = arr.length;
  const changeLog: ChangeLog<T> | undefined = logChanges ? [] : undefined;

  for (let i = 0; i < len - 1; i++) {
    let minElIndex = i + 1;
    let elementsAreSwapped = false;

    for (let j = i + 2; j < len; j++) {
      if (compareFn(arr[j], arr[minElIndex]) < 0) minElIndex = j;
    }

    if (compareFn(arr[minElIndex], arr[i]) < 0) {
      elementsAreSwapped = true;
      [arr[i], arr[minElIndex]] = [arr[minElIndex], arr[i]];
    }

    logChanges && changeLog!.push({
      comparisonIndexes: [minElIndex, i],
      swappingIndexes: elementsAreSwapped ? [minElIndex, i] : null,
      array: [...arr],
    });
  }

  return logChanges ? [arr, changeLog!] : arr;
}

export default selectionSort;