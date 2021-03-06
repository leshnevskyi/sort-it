import {useEffect} from 'react';

import {SortingStage} from 'context/sorting';
import useSorting from './useSorting';

function useSortingKeyframes() {
  const {
    sortingStage,
    setSortingStage,
    currentIteration,
    setCurrentIteration,
    sortingLog,  
    sortingSpeed,
  } = useSorting();
  
  useEffect(() => {
    if (!sortingLog) return;
    
    const changeCount = sortingLog.length;
    const maxIterationDelay = 100;
    const iterationDelay = maxIterationDelay * sortingSpeed;
    const maxIteration = changeCount - 1;

    setTimeout(() => {
      if (
        currentIteration === maxIteration
        && sortingStage === SortingStage.InProgress
      ) {
        setSortingStage(SortingStage.Finished);

        return;
      };

      setCurrentIteration(currIteration => {
        const nextIteration = currIteration !== null ? currIteration + 1 : 0;

        return nextIteration > maxIteration ? currIteration : nextIteration;
      });
    }, iterationDelay);
  });
}

export default useSortingKeyframes;