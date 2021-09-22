import type {SortFnContext} from './utils';
import createSortFn from './utils';

function selectionSortAlgorithm<T>(this: SortFnContext<T>) {
  const len = this.array.length;

  for (let i = 0; i < len - 1; i++) {
    let minElIndex = i + 1;

    for (let j = i + 2; j < len; j++) {
      if (this.compare(j, minElIndex) < 0) minElIndex = j;
    }

    if (this.compare(minElIndex, i) < 0) {
      this.swap(i, minElIndex);
    }
  }
}

const selectionSort = createSortFn(selectionSortAlgorithm);

export default selectionSort;