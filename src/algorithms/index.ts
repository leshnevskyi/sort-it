enum SortingAlgorithm {
  BubbleSort,
  SelectionSort,
  ShellSort,
  MergeSort,
  QuickSort,
  CountingSort,
}

const algoNames = [
  'bubble',
  'selection',
  'shell',
  'merge',
  'quick',
  'counting',
];

export {default as bubbleSort} from './bubbleSort';
export {default as selectionSort} from './selectionSort';
export {SortingAlgorithm, algoNames};