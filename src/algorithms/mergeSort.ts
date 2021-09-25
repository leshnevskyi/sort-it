import type {SortFnContext} from './utils';
import createSortFn from './utils';

function mergeSortAlgorithm<T>(
  this: SortFnContext<T>, 
  startIndex: number = 0, 
  endIndex: number = this.array.length
) {
  const subarrayLen = endIndex - startIndex;

  if (subarrayLen <= 1) return;

  const leftPartLen = Math.ceil(subarrayLen / 2);
  const rightPartLen = subarrayLen - leftPartLen;
  const middleIndex = startIndex + leftPartLen;
  const leftPartBoudary = startIndex + leftPartLen;
  const rightPartBoudary = middleIndex + rightPartLen;

  // @ts-ignore
  mergeSortAlgorithm.call(this, startIndex, leftPartBoudary);
  // @ts-ignore
  mergeSortAlgorithm.call(this, middleIndex, rightPartBoudary);

  let currElIndex = startIndex;
  let leftPartIndex = startIndex;
  let rightPartIndex = middleIndex;

  let sortedElements: T[] = [];

  while (leftPartIndex < leftPartBoudary && rightPartIndex < rightPartBoudary) {
    !sortedElements.includes(this.array[currElIndex])
      && this.stash(currElIndex);

    if (this.compare(leftPartIndex, rightPartIndex) > 0) {
      this.replace(currElIndex, rightPartIndex);
      sortedElements.push(this.array[rightPartIndex]);
      rightPartIndex++;
    } else {
      if (this.array.stash[leftPartIndex] !== null) {
        this.replace(currElIndex, leftPartIndex);
      }

      leftPartIndex++;
    }

    currElIndex++;
  }

  while (this.array.stash[leftPartIndex] !== null) {
    !sortedElements.includes(this.array[currElIndex])
      && this.stash(currElIndex);
    this.replace(currElIndex, leftPartIndex);
    currElIndex++;
    leftPartIndex++;
  }
}

/**
 * function mergeSort<T>(array: T[]): T[] {
 *   if (array.length <= 1) return array;
 * 
 *   const middleIndex = array.length / 2;
 *   const leftSortedPart = mergeSort(array.slice(0, middleIndex));
 *   const rightSortedPart = mergeSort(array.slice(middleIndex, array.length));
 *   const mergedArray: T[] = [];
 * 
 *   while (leftSortedPart.length && rightSortedPart.length) {
 *     if (leftSortedPart[0] < rightSortedPart[0]) {
 *       mergedArray.push(leftSortedPart.shift()!);
 *     } else {
 *       mergedArray.push(rightSortedPart.shift()!);
 *     }
 *   }
 * 
 *   return [...mergedArray, ...leftSortedPart, ...rightSortedPart];
 * }
 */

const mergeSort = createSortFn(mergeSortAlgorithm);

export default mergeSort;