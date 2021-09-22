import type {SortFn} from './utils';

import bubbleSort from './bubbleSort';
import selectionSort from './selectionSort';
import shellSort from './shellSort';

enum SortingAlgorithm {
  BubbleSort,
  SelectionSort,
  ShellSort,
  MergeSort,
  QuickSort,
  CountingSort,
}

interface SortingAlgorithmData {
  name: string;
  sortFn: SortFn;
  url: string;
}

const sortingAlgorithms: SortingAlgorithmData[] = [
  {name: 'bubble', sortFn: bubbleSort},
  {name: 'selection', sortFn: selectionSort},
  {name: 'shell', sortFn: shellSort},
  {name: 'merge', sortFn: shellSort},
  {name: 'quick', sortFn: shellSort},
  {name: 'counting', sortFn: shellSort},
].map(algorithm => ({...algorithm, url: `/${algorithm.name}-sort`}));

export {
  SortingAlgorithm, 
  sortingAlgorithms,
  bubbleSort,
  selectionSort,
  shellSort,
};