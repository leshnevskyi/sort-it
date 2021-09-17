import {defaultCompareFn} from './utils';

const shellSort = <T>(
  [...arr]: T[], 
  compareFn: CompareFn<T> = defaultCompareFn,
  logChanges: boolean = false,
): T[] | [T[], ChangeLog<T>] => {
  let len = arr.length;
  const changeLog: ChangeLog<T> | undefined = logChanges ? [] : undefined;

  for (let gap = Math.floor(len / 2); gap != 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      let temp = arr[i];
      let j;
      let elementsAreSwapped = false;

      for (j = i; j >= gap && compareFn(arr[j - gap], temp) > 0; j -= gap) {
        arr[j] = arr[j - gap];
        elementsAreSwapped = true;
      }

      logChanges && changeLog!.push({
        comparisonIndexes: [j, j + 1],
        swappingIndexes: elementsAreSwapped ? [j, j + 1] : null,
        array: [...arr],
      });

      arr[j] = temp;
    }
  }

  return logChanges ? [arr, changeLog!] : arr;
}

export default shellSort;