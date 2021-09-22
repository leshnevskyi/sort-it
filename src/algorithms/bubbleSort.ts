import type {SortFnContext} from './utils';
import createSortFn from './utils';

function bubbleSortAlgorithm<T>(this: SortFnContext<T>) {
  const len = this.array.length;

  for (let i = 0; i < len; i++) {
    let elementsAreSwapped = false;

    for (let j = 0; j < len - 1; j++) {
      if (this.compare(j, j + 1) > 0) {
        elementsAreSwapped = true;
        this.swap(j, j + 1);
      }
    }

    if (!elementsAreSwapped) break;
  }
}

const bubbleSort = createSortFn(bubbleSortAlgorithm);

export default bubbleSort;