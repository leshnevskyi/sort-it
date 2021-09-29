import {createContext, useState} from 'react';

import {generateRandomNumbers} from 'utils';
import type {SortingSnapshot} from 'algorithms/utils';
import {SortingAlgorithm} from 'algorithms';

enum SortingStage {
  Idle,
  InProgress,
  Finished,
}

interface SortingContextValue<T> {
  arrayLength: number;
  setArrayLength: React.Dispatch<React.SetStateAction<number>>;
  array: T[];
  setArray: React.Dispatch<React.SetStateAction<number[]>>;
  sortingLog: SortingSnapshot<T>[] | null;
  setSortingLog: React.Dispatch<React.SetStateAction<
    SortingSnapshot<T>[] | null>
  >;
  currentIteration: number | null;
  setCurrentIteration: React.Dispatch<React.SetStateAction<number | null>>;
  sortingStage: SortingStage;
  setSortingStage: React.Dispatch<React.SetStateAction<SortingStage>>;
  sortingSpeed: number;
  setSortingSpeed: React.Dispatch<React.SetStateAction<number>>;
  sortingAlgorithmIndex: SortingAlgorithm;
  setSortingAlgorithmIndex: React.Dispatch<React.SetStateAction<
    SortingAlgorithm
  >>;
  sortingTime: DOMHighResTimeStamp | undefined;
  setSortingTime: React.Dispatch<React.SetStateAction<
    DOMHighResTimeStamp | undefined
  >>;
}

const SortingContext = createContext<
  SortingContextValue<number> | undefined
>(undefined);

interface SortingProviderProps {
  children: React.ReactNode;
}

const SortingProvider = ({children}: SortingProviderProps) => {
  const [arrayLength, setArrayLength] = useState(100);
  const [array, setArray] = useState(generateRandomNumbers(arrayLength));
  const [sortingLog, setSortingLog] = useState<
    SortingSnapshot<number>[] | null
  >(null);
  const [currentIteration, setCurrentIteration] = useState<number | null>(null);
  const [sortingStage, setSortingStage] = useState(SortingStage.Idle);
  const [sortingSpeed, setSortingSpeed] = useState(0.1);
  const [sortingAlgorithmIndex, setSortingAlgorithmIndex] = useState(
    SortingAlgorithm.BubbleSort
  );
  const [sortingTime, setSortingTime] = useState<DOMHighResTimeStamp>();

  return (
    <SortingContext.Provider 
      value={{
        arrayLength, setArrayLength, 
        array, setArray, 
        sortingLog, setSortingLog, 
        currentIteration, setCurrentIteration,
        sortingStage, setSortingStage,
        sortingSpeed, setSortingSpeed,
        sortingAlgorithmIndex, setSortingAlgorithmIndex,
        sortingTime, setSortingTime,
      }}
    >
      {children}
    </SortingContext.Provider>
  );
}

export {SortingContext, SortingProvider, SortingStage};