import type {SortFnContext} from './utils';
import createSortFn from './utils';

function quickSortAlgorithm<T>(
  this: SortFnContext<T>, 
  startIndex: number = 0, 
  endIndex: number = this.array.length - 1
) {
  if (endIndex - startIndex < 1) return;
  
  let pivotIndex = Math.floor((startIndex + endIndex) / 2);
  let leftIndex = startIndex;
  let rightIndex = endIndex;

  while (leftIndex <= rightIndex) {
    while (this.compare(leftIndex, pivotIndex) < 0) {
      leftIndex++;
    }

    while (this.compare(rightIndex, pivotIndex) > 0) {
      rightIndex--;
    }

    if (leftIndex <= rightIndex) {
      if (pivotIndex === leftIndex) pivotIndex = rightIndex;
      else if (pivotIndex === rightIndex) pivotIndex = leftIndex;

      this.swap(leftIndex, rightIndex);
      leftIndex++;
      rightIndex--;
    }
  }
  
  // @ts-ignore
  quickSortAlgorithm.call(this, startIndex, leftIndex - 1);
  // @ts-ignore
  quickSortAlgorithm.call(this, leftIndex, endIndex);
}

/**
 * function quickSort<T>(array: T[]): T[] {
 *   if (array.length <= 1) return array;
 *   
 *   const pivot = array[Math.ceil(array.length / 2)];
 *   const lessThanPivotElements: T[] = [];
 *   const greaterThanPivotElements: T[] = [];
 * 
 *   array.forEach(el => el < pivot 
 *     ? lessThanPivotElements.push(el)
 *     : el > pivot  
 *       ? greaterThanPivotElements.push(el)
 *       : undefined
 *   );
 * 
 *   return [
 *     ...quickSort<T>(lessThanPivotElements),
 *     pivot,
 *     ...quickSort<T>(greaterThanPivotElements),
 *   ];
 * }
 */

const quickSort = createSortFn(quickSortAlgorithm);

export default quickSort;