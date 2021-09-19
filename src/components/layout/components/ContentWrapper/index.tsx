import {BackgroundHeading, Wrapper} from './styled';
import {useSorting} from 'hooks';
import {sortingAlgorithms} from 'algorithms';

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper = ({children}: ContentWrapperProps) => {
  const algoIndex = useSorting().sortingAlgorithmIndex;

  return (
    <Wrapper>
      <BackgroundHeading algoName={sortingAlgorithms[algoIndex].name}/>
      {children}
    </Wrapper>
  );
}

export default ContentWrapper;