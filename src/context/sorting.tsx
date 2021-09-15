import {createContext, useState} from 'react';

import {generateRandomNumbers} from 'utils';

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
  changeLog: ChangeLog<number> | null;
  setChangeLog: React.Dispatch<React.SetStateAction<ChangeLog<number> | null>>;
  currentIteration: number | null;
  setCurrentIteration: React.Dispatch<React.SetStateAction<number | null>>;
  sortingStage: SortingStage;
  setSortingStage: React.Dispatch<React.SetStateAction<SortingStage>>;
  sortingSpeed: number;
  setSortingSpeed: React.Dispatch<React.SetStateAction<number>>;
  sortingAlgorithm: SortingAlgorithm;
  setSortingAlgorithm: React.Dispatch<React.SetStateAction<SortingAlgorithm>>;
}

const SortingContext = createContext<
  SortingContextValue<number> | undefined
>(undefined);

interface SortingProviderProps {
  children: React.ReactNode;
}

const SortingProvider = ({children}: SortingProviderProps) => {
  const [arrayLength, setArrayLength] = useState(20);
  const [array, setArray] = useState(generateRandomNumbers(arrayLength));
  const [changeLog, setChangeLog] = useState<
    ChangeLog<number> | null
  >(null);
  const [currentIteration, setCurrentIteration] = useState<number | null>(null);
  const [sortingStage, setSortingStage] = useState(SortingStage.Idle);
  const [sortingSpeed, setSortingSpeed] = useState(0.1);
  const [sortingAlgorithm, setSortingAlgorithm] = useState(
    SortingAlgorithm.BubbleSort
  );

  return (
    <SortingContext.Provider 
      value={{
        arrayLength, setArrayLength, 
        array, setArray, 
        changeLog, setChangeLog, 
        currentIteration, setCurrentIteration,
        sortingStage, setSortingStage,
        sortingSpeed, setSortingSpeed,
        sortingAlgorithm, setSortingAlgorithm,
      }}
    >
      {children}
    </SortingContext.Provider>
  );
}

export {SortingContext, SortingProvider, SortingStage};