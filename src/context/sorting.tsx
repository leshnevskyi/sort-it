import {createContext, useState, useEffect} from 'react';

import {generateRandomBarArray} from 'utils';

import {SortingAlgorithm} from 'algorithms';

enum SortingStage {
  Idle,
  Started,
  Finished,
}

interface SortingContextValue<T> {
  arrayLength: number;
  setArrayLength: React.Dispatch<React.SetStateAction<number>>;
  array: T[];
  setArray: React.Dispatch<React.SetStateAction<Bar[]>>;
  currentChange: Change<T> | null;
  setCurrentChange: React.Dispatch<React.SetStateAction<Change<T> | null>>;
  sortingStage: SortingStage;
  setSortingStage: React.Dispatch<React.SetStateAction<SortingStage>>;
  sortingSpeed: number;
  setSortingSpeed: React.Dispatch<React.SetStateAction<number>>;
  sortingAlgorithm: SortingAlgorithm;
  setSortingAlgorithm: React.Dispatch<React.SetStateAction<SortingAlgorithm>>;
}

const SortingContext = createContext<
  SortingContextValue<Bar> | undefined
>(undefined);

interface SortingProviderProps {
  children: React.ReactNode;
}

const SortingProvider = ({children}: SortingProviderProps) => {
  const [arrayLength, setArrayLength] = useState(20);
  const [array, setArray] = useState(generateRandomBarArray(
    arrayLength, 0.05, 1
  ));
  const [currentChange, setCurrentChange] = useState<Change<Bar> | null>(null);
  const [sortingStage, setSortingStage] = useState(SortingStage.Idle);
  const [sortingSpeed, setSortingSpeed] = useState(0.1);
  const [sortingAlgorithm, setSortingAlgorithm] = useState(
    SortingAlgorithm.BubbleSort
  );

  useEffect(() => {
    sortingStage === SortingStage.Idle && setCurrentChange(null);
  }, [sortingStage])

  return (
    <SortingContext.Provider 
      value={{
        arrayLength, setArrayLength, 
        array, setArray, 
        currentChange, setCurrentChange, 
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