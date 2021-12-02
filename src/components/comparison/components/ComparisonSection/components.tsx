import styled from 'styled-components';

import {ContentWrapper} from 'components/layout';

import colors from 'styles/colors';

const Wrapper = styled.section`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background: ${colors.william};
`;

const BarContainer = styled(ContentWrapper)`
  --bar-min-height: 35%;

  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 calc(2 * var(--h-padding));
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  &::before {
    content: '';
    position: absolute;
    bottom: var(--bar-min-height);
    width: calc(100% - 4 * var(--h-padding));
    height: 2px;
    display: flex;
    background: ${colors.pickledBluewood};
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-top: var(--v-padding);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export {Wrapper, BarContainer, ButtonContainer};
export {default as Bar} from '../Bar';