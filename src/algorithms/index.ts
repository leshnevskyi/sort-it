import type {SortFn} from './utils';

import bubbleSort from './bubbleSort';
import selectionSort from './selectionSort';
import shellSort from './shellSort';
import mergeSort from './mergeSort';
import quickSort from './quickSort';

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
  {name: 'merge', sortFn: mergeSort},
  {name: 'quick', sortFn: quickSort},
  {name: 'counting', sortFn: shellSort},
].map(algorithm => ({...algorithm, url: `/${algorithm.name}-sort`}));

export {
  SortingAlgorithm, 
  sortingAlgorithms,
  bubbleSort,
  selectionSort,
  shellSort,
};