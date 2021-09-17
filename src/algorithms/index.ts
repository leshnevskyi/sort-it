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
  sortFn?: SortFn<number>;
  url?: string;
}

const sortingAlgorithms: SortingAlgorithmData[] = [
  {name: 'bubble', sortFn: bubbleSort},
  {name: 'selection', sortFn: selectionSort},
  {name: 'shell', sortFn: shellSort},
  {name: 'merge'},
  {name: 'quick'},
  {name: 'counting'},
];

const urls = sortingAlgorithms.map(algorithm => `/${algorithm.name}-sort`);

urls.forEach((url, index) => sortingAlgorithms[index].url = url);

export {
  SortingAlgorithm, 
  sortingAlgorithms,
  bubbleSort,
  selectionSort,
  shellSort,
};