import type {SortFnContext} from './utils';
import createSortFn from './utils';

function shellSortAlgorithm<T>(this: SortFnContext<T>) {
  const len = this.array.length;

  for (let gap = Math.floor(len / 2); gap != 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      const stashedEl = this.stash(i);
      let j;
      
      for (j = i; j >= gap && this.compare(j - gap, stashedEl) > 0; j -= gap) {
        this.replace(j, j - gap);
      }

      this.replace(j, stashedEl.unstash());
    }
  }
}

const shellSort = createSortFn(shellSortAlgorithm);

export default shellSort;