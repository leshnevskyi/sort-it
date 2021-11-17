import {expose} from 'comlink';
import {round} from 'lodash';

import {sortingAlgorithms, SortingAlgorithm} from 'algorithms';

const api = {
  time: 0,

  sort<T>(array: T[], algorithm: SortingAlgorithm) {
    const startTimeStamp = performance.now();
    const sortedArray = sortingAlgorithms[algorithm].sortFn(array);
    const finishTimeStamp = performance.now();
    this.time = round(finishTimeStamp - startTimeStamp, 2);
    
    return sortedArray;
  },
};

type Api = typeof api;

expose(api);

export type {Api};