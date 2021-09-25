import {useContext, useMemo} from 'react';

import {SortingContext, SortingStage} from 'context/sorting';
import {SortingLog, StashableArrayElement} from 'algorithms/utils';
import {sortingAlgorithms} from 'algorithms';

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
    setSortingLog,
    setCurrentIteration, 
    setSortingStage,
    sortingAlgorithmIndex,
  } = sortingContextValue;
  
  let sortFn = sortingAlgorithms[sortingAlgorithmIndex].sortFn;

  const sortingLog = useMemo(() => new SortingLog(array), [array]);

  sortFn.attachListeners({
    onCompare: (firstEl, secondEl) => sortingLog.add({
      comparedElements: [firstEl, secondEl] as [
        StashableArrayElement<number>, StashableArrayElement<number>
      ],
    }),
    onReplace: (index, _, changedArray) => sortingLog.add({
      // @ts-ignore
      array: changedArray,
      replacementIndex: index,
    }),
    onSwap: (firstIndex, secondIndex, changedArray) => sortingLog.add({
      // @ts-ignore
      array: changedArray,
      swapIndexes: [firstIndex, secondIndex],
    }),
  });
  
  function startSorting() {
    sortFn(array);
    setSortingStage(SortingStage.InProgress);
    setSortingLog(sortingLog.retrieve());
    setCurrentIteration(null);
  }

  function regenerateArray() {
    setArray(generateRandomNumbers(arrayLength));
    setSortingStage(SortingStage.Idle);
    setSortingLog(null);
    setCurrentIteration(null);
  }

  return {...sortingContextValue, startSorting, regenerateArray};
}

export default useSorting;