import {useContext} from 'react';

import {SortingContext, SortingStage} from 'context/sorting';
import {bubbleSort, selectionSort} from 'algorithms';

import {SortingAlgorithm} from 'algorithms';
import {generateRandomNumbers} from 'utils';

function useSorting() {
  const sortingContextValue = useContext(SortingContext);

  if (sortingContextValue === undefined) {
    throw new Error(
      '\'useSorting\' hook must be used inside of a SortingProvider'
    );
  }

  const {
    array, setArray,
    arrayLength,
    setChangeLog,
    setCurrentIteration, 
    setSortingStage,
    sortingAlgorithm, 
  } = sortingContextValue;
  
  let sortFn: SortFn<number> = bubbleSort;

  switch (sortingAlgorithm) {
    case SortingAlgorithm.BubbleSort: {
      sortFn = bubbleSort;

      break;
    }
    
    case SortingAlgorithm.SelectionSort: {
      sortFn = selectionSort;

      break;
    }
  }

  const compareFn = (firstEl: number, secondEl: number) => {
    return firstEl - secondEl;
  }

  const [, changeLog] = sortFn(array, compareFn, true) as [
    number[], ChangeLog<number>
  ];

  function startSorting() {
    setSortingStage(SortingStage.InProgress);
    setChangeLog(changeLog);
    setCurrentIteration(null);
  }

  function regenerateArray() {
    setArray(generateRandomNumbers(arrayLength));
    setSortingStage(SortingStage.Idle);
    setChangeLog(null);
    setCurrentIteration(null);
  }

  return {...sortingContextValue, startSorting, regenerateArray};
}

export default useSorting;