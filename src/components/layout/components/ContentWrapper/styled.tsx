import styled from 'styled-components';
import {capitalize} from 'lodash';

import colors from 'styles/colors';

const Wrapper = styled.div`
  position: relative;
  max-height: 100%;
  padding: 0 var(--h-padding);
  display: grid;
  grid: auto 70% / 1fr;
  align-items: space-between;
  overflow: hidden;
`;

interface BackgroundHeadingProps {
  readonly algoName: string;
}

const BackgroundHeading = styled.span<BackgroundHeadingProps>`
  position: absolute;
  transform: translate(-50%, 10vw) rotate(-15deg);
  z-index: -10;

  &::before, &::after {
    --text-size: ${props => `${props.algoName} sort`.length};
    --text-color: ${colors.pickledBluewood};
    --animation-speed: calc(var(--text-size) * 1s);

    @keyframes offset {
      from {
        transform: translateX(calc(-100% - 1.5ch));
      }

      to {
        transform: translateX(calc(100% + 1.5ch));
      }
    }

    content: '${props => capitalize(props.algoName)} Sort';
    position: absolute;
    font-size: var(--font-size-1000);
    font-weight: 900;
    white-space: nowrap;
    animation: offset var(--animation-speed) infinite linear;
  }

  &::after {
    transform: translateX(calc(-100% - 1.5ch));
    animation-delay: calc(var(--animation-speed) / 2);
  }
`;

export {Wrapper, BackgroundHeading};