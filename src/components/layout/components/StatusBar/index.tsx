import useEventListener from '@use-it/event-listener';

import {ButtonContainer, StatusBarWrapper} from './styled';
import {Button} from 'components/shared';
import {ReactComponent as ShowChangelogIcon} from 'assets/icons/history.svg';
import {ReactComponent as SortArrayIcon} from 'assets/icons/start.svg';
import {ReactComponent as RegenerateArrayIcon} from 'assets/icons/repeat.svg';

import {useSorting} from 'hooks';

const StatusBar = () => {
  const {startSorting, regenerateArray} = useSorting();

  useEventListener('keydown', (event: KeyboardEvent) => {
    if (event.code === 'Space') startSorting();
  });
  
  return (
    <StatusBarWrapper>
      <ButtonContainer>
        <Button>
          <ShowChangelogIcon/>
        </Button>
        <Button onClick={startSorting}>
          <SortArrayIcon/>
        </Button>
        <Button onClick={regenerateArray}>
          <RegenerateArrayIcon/>
        </Button>
      </ButtonContainer>
    </StatusBarWrapper>
  );
}

export default StatusBar;