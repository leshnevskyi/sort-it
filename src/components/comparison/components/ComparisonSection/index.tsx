import {useState, useEffect} from 'react';
import {round} from 'lodash';

import {Wrapper, BarContainer, Bar} from './components';

import {sortingAlgorithms} from 'algorithms';
import {generateRandomNumbers} from 'utils';

const ComparisonSection = () => {
  const [arrayLength, setArrayLength] = useState(800);
  const [times, setTimes] = useState<number[] | null>(null);

  useEffect(() => {
    setTimes(null);

    const randomNumbers = generateRandomNumbers(arrayLength);

    const times = sortingAlgorithms.map(algoritm => {
      const startTimeStamp = performance.now();
      algoritm.sortFn(randomNumbers);
      const finishTimeStamp = performance.now();

      return round(finishTimeStamp - startTimeStamp, 2);
    });

    setTimes(times);
  }, [arrayLength]);

  const renderedBars = sortingAlgorithms.map((algorithm, index) => {
    const upperBoundTime = 100;
    const maxTime = times && Math.min(Math.max(...times), upperBoundTime) || 0;
    const minTime = times && Math.min(Math.min(...times), upperBoundTime) || 0;

    const getValue = (time: number) => {
      return time < upperBoundTime ? (time - minTime) / (maxTime - minTime) : 1;
    }

    return (
      <Bar 
        caption={`${algorithm.name} sort`} 
        value={times ? getValue(times[index]) : 0}
        valueText={times && `${times[index]}ms`}
      />
    );
  });

  return (
    <Wrapper>
      <BarContainer>
        {renderedBars}
      </BarContainer>
    </Wrapper>
  );
}

export default ComparisonSection;