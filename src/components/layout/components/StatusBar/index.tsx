import useEventListener from '@use-it/event-listener';

import {
  StatusBarWrapper, 
  ButtonContainer, 
  InfoBar,
  Boldfaced,
  Footer,
  GitHubLink,
} from './styled';
import {Button, Text} from 'components/shared';
import {ReactComponent as ShowChangelogIcon} from 'assets/icons/history.svg';
import {ReactComponent as SortArrayIcon} from 'assets/icons/start.svg';
import {ReactComponent as RegenerateArrayIcon} from 'assets/icons/repeat.svg';
import {ReactComponent as GitHubLogo} from 'assets/logos/github.svg';

import {useSorting} from 'hooks';

const StatusBar = () => {
  const {startSorting, regenerateArray, sortingTime} = useSorting();

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
      <InfoBar>
        {sortingTime
          ? <>
              <Text>Sorted in: <Boldfaced>{sortingTime}ms</Boldfaced></Text>
              <Text>To start again press <Boldfaced>Space</Boldfaced></Text>
            </>
          : <Text>
              Let's see how long it takes! <Boldfaced>Sort it!</Boldfaced>
            </Text>
        }
      </InfoBar>
      <Footer>
        <GitHubLink>
          <GitHubLogo/>
        </GitHubLink>
      </Footer>
    </StatusBarWrapper>
  );
}

export default StatusBar;