import styled from 'styled-components';

import {Button} from 'components/shared';

import colors from 'styles/colors';

const StatusBarWrapper = styled.div`
  --bg-color: linear-gradient(to bottom, ${colors.rodeoDust}, transparent);
  
  --button-size: calc(var(--status-bar-width) * 0.6);
  
  --v-padding: calc(var(--button-size) * 0.8);

  position: relative;
  height: 100%;
  padding: var(--v-padding) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  position: relative;
  top: calc(0px - var(--v-padding) / 2);
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  & > ${Button} {
    height: calc(var(--button-size) + var(--v-padding));
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & > svg {
      width: 60%;
    }
  }

  &:hover > ${Button}:not(:hover) {
    filter: blur(2px);
  }
`;

export {
  StatusBarWrapper,
  ButtonContainer,
};