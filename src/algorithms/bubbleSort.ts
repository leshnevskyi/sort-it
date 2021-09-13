import {defaultCompareFn} from './utils';

const bubbleSort = <T>(
  [...arr]: T[], 
  compareFn: CompareFn<T> = defaultCompareFn,
  logChanges: boolean = false,
): T[] | [T[], ChangeLog<T>] => {
  const len = arr.length;
  const changeLog: ChangeLog<T> | undefined = logChanges ? [] : undefined;

  for (let i = 0; i < len; i++) {
    let elementsAreSwapped = false;

    for (let j = 0; j < len - 1; j++) {
      if (compareFn(arr[j], arr[j + 1]) > 0) {
        elementsAreSwapped = true;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
      
      logChanges && changeLog!.push({
        comparisonIndexes: [j, j + 1],
        swappingIndexes: elementsAreSwapped ? [j, j + 1] : null,
        array: [...arr],
      });
    }

    if (!elementsAreSwapped) break;
  }

  return logChanges ? [arr, changeLog!] : arr;
}

export default bubbleSort;