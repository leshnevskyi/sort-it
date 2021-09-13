import styled from 'styled-components';
import {capitalize} from 'lodash';

import colors from 'styles/colors';

interface ContentWrapperProps {
  readonly algoName: string;
}

const ContentWrapper = styled.div<ContentWrapperProps>`
  position: relative;
  max-height: 100%;
  padding: 0 var(--h-padding);
  display: grid;
  grid: auto 70% / 1fr;
  align-items: space-between;
  overflow-y: hidden;

  &::before, &::after {
    content: '${props => capitalize(props.algoName)} Sort';
    position: absolute;
    font-size: var(--font-size-1000);
    font-weight: 900;
    color: ${colors.pickledBluewood};
    transform: rotate(-15deg) translateX(var(--offset));
    z-index: -10;
  }

  &::before {
    --offset: -10%;

    top: 0;
    left: 0;
  }

  &::after {
    --offset: 10%;

    bottom: 0;
    right: 0;
  }
`;

export {ContentWrapper};