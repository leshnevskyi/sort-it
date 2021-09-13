import styled from 'styled-components';

import colors from 'styles/colors';

interface BarsWrapperProps {
  readonly barCount: number;
}

const BarsWrapper = styled.div<BarsWrapperProps>`
  position: relative;
  bottom: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: ${props => 40 / props.barCount}%;
`;

interface BarProps {
  readonly value: number;
  readonly isCompared: boolean;
}

const Bar = styled.div<BarProps>`
  --bg-color: linear-gradient(to bottom, ${props => {
    return props.isCompared ? colors.sandyBrown : colors.tiara;
  }}, transparent);

  position: relative;
  height: 100%;
  flex: 1;
  transform: scaleY(${props => props.value});
  transform-origin: center bottom;
`;

export {BarsWrapper, Bar};