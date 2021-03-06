import {useState, useEffect, useCallback} from 'react';
import {wrap} from 'comlink';
import {debounce} from 'lodash';

import {Wrapper, BarContainer, Bar, ButtonContainer} from './components';
import {RangeInput} from 'components/shared';

import {sortingAlgorithms} from 'algorithms';
import {generateRandomNumbers} from 'utils';

import type {Api as SortingWorkerApi} from 'workers/sorting';

const ComparisonSection = () => {
  const [arrayLength, setArrayLength] = useState(777);
  const [times, setTimes] = useState<number[] | null>(null);

  useEffect(() => {
    setTimes(null);
    const randomNumbers = generateRandomNumbers(arrayLength);

    (async () => {
      const times = await Promise.all(
        sortingAlgorithms.map(async (_, algorithmIndex) => {
          const worker = new Worker('workers/sorting', {type: 'module'});
          const {sort, time} = wrap(worker) as unknown as SortingWorkerApi;
          await sort(randomNumbers, algorithmIndex); 
  
          return time;
        })
      );

      setTimes(times);
    })();
  }, [arrayLength]);

  const renderedBars = sortingAlgorithms.map((algorithm, index) => {
    const upperBoundTime = 1000;
    const maxTime = times && (
      Math.min(Math.max(...times), upperBoundTime)
    ) || 0;
    const minTime = 0;

    const getValue = (time: number) => {
      return time < upperBoundTime ? (time - minTime) / (maxTime - minTime) : 1;
    }

    return (
      <Bar 
        caption={`${algorithm.name} sort`} 
        value={times ? getValue(times[index]) : 0}
        valueText={times && `${times[index]}ms`}
        isOutOfRange={Boolean(times && times[index] > upperBoundTime)}
      />
    );
  });

  const debouncedInputChangeHandler = useCallback(
    debounce((value: number) => setArrayLength(value), 500), []
  );

  return (
    <Wrapper>
      <BarContainer>
        {renderedBars}
      </BarContainer>
      <ButtonContainer>
        <RangeInput 
          initialValue={arrayLength} 
          onChange={debouncedInputChangeHandler}
        />
      </ButtonContainer>
    </Wrapper>
  );
}

export default ComparisonSection;