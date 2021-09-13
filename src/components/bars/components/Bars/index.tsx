import {BarsWrapper, Bar} from './styled';

import {SortingStage} from 'context/sorting';
import {useSorting} from 'hooks';

const Bars = () => {
  const {array, arrayLength, currentChange, sortingStage} = useSorting();
  const bars = sortingStage !== SortingStage.Idle && currentChange
    ? currentChange.array : array;

  const renderedBars = bars.map((bar, barIndex) => {
    const isCompared = Boolean(
      sortingStage === SortingStage.Started 
      && currentChange?.comparisonIndexes.some(index => {
        return index === barIndex;
      })
    );

    return (
      <Bar 
        key={bar.id} 
        value={bar.value} 
        isCompared={isCompared}
      />
    );
  });

  return <BarsWrapper barCount={arrayLength}>{renderedBars}</BarsWrapper>;
}

export default Bars;