import styled from 'styled-components';

import {Text} from 'components/shared';

import colors from 'styles/colors';

interface WrapperProps {
  value: number | null;
  isOutOfRange: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  --h-padding: 0.8rem;

  position: relative;
  height: calc(
    var(--bar-min-height) 
    + (100% - var(--bar-min-height)) * ${({value}) => value}
  );
  padding: 2rem var(--h-padding);
  display: flex;
  align-items: center;
  justify-content: space-between;
  writing-mode: vertical-lr;
  background: linear-gradient(
    ${({isOutOfRange}) => isOutOfRange ? colors.white : colors.william}, 
    transparent
  );
`;

const BarText = styled(Text).attrs({size: 600, weight: 700})`
  transform: rotate(180deg);
`;

const Caption = styled(BarText)`
  --text-color: ${colors.sandyBrown};

  text-transform: capitalize;
`;

const Value = styled(BarText)`
  --text-color: ${colors.william};
`;

export {Wrapper, Caption, Value};