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

const InfoBar = styled.div`
  --text-color: ${colors.tiara};

  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  gap: 4rem;
  font-size: var(--font-size-300);
  font-weight: 700;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
`;

const Boldfaced = styled.b`
  --text-color: ${colors.wafer};

  font-size: var(--font-size-400);
  font-weight: 700;
`;

const Footer = styled.footer`
  position: relative;
  bottom: calc(0px - var(--v-padding) / 2);
  width: 100%;
  display: flex;
  justify-content: center;
`;

const GitHubLink = styled.a.attrs({href: '//github.com/leshnevskyi/sort-it'})`
  --icon-color: ${colors.wafer};

  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  /**
   * A pseudo-element to increase the clickable area of the link.
   */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: scaleY(2);
  }

  & > svg {
    width: 50%;
  }

  &:hover {
    --icon-color: ${colors.tiara};
    --icon-stroke-width: 1px;
    
    & > svg {
      transform: scale(1.1);
      filter: drop-shadow(0 0 10px var(--icon-color));
    }
  }
`;

export {
  StatusBarWrapper,
  ButtonContainer,
  InfoBar,
  Boldfaced,
  Footer,
  GitHubLink,
};