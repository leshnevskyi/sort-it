import {useEffect, useContext} from 'react';

import {SortingContext, SortingStage} from 'context/sorting';
import {bubbleSort, selectionSort} from 'algorithms';

import {SortingAlgorithm} from 'algorithms';
import {generateRandomBarArray} from 'utils';

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
    setCurrentChange, 
    sortingStage, setSortingStage,
    sortingAlgorithm, 
    sortingSpeed
  } = sortingContextValue;
  
  let sortFn: SortFn<Bar> = bubbleSort;

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

  const compareFn = (firstEl: Bar, secondEl: Bar) => {
    return firstEl.value - secondEl.value;
  }

  const [, changeLog] = sortFn(array, compareFn, true) as [
    Bar[], ChangeLog<Bar>
  ];

  useEffect(() => {
    if (sortingStage !== SortingStage.Started) return;
    
    const changeCount = changeLog.length;
    const maxIterationDelay = 300;
    const iterationDelay = maxIterationDelay * sortingSpeed;
    let iteration = 0;

    const timeoutId = setTimeout(function nextChange() {
      if (iteration === changeCount) {
        setSortingStage(SortingStage.Finished);

        return;
      };

      setCurrentChange(changeLog[iteration++]);
      setTimeout(nextChange, iterationDelay);
    }, iterationDelay);

    return () => clearTimeout(timeoutId);
  }, [
    sortingStage, changeLog, setCurrentChange, setSortingStage, sortingSpeed
  ]);

  function startSorting() {
    setSortingStage(SortingStage.Started);
  }

  function regenerateArray() {
    setArray(generateRandomBarArray(arrayLength, 0.05, 1));
    setSortingStage(SortingStage.Idle);
  }

  return {...sortingContextValue, startSorting, regenerateArray};
}

export default useSorting;