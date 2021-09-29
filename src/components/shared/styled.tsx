import styled from 'styled-components';

import colors from 'styles/colors';

const Button = styled.button.attrs(props => {
  return {type: props.type ?? 'button'}
})`
  position: relative;
  height: var(--button-size);
  display: flex;
  border: none;
  transition: var(--normal-transition-duration);
  cursor: pointer;
`;

interface TextProps {
  size?: number;
  weight?: number;
  color?: keyof typeof colors;
}

const Text = styled.span<TextProps>`
  font-size: var(--font-size-${props => props.size});
  font-weight: ${props => props.weight};
  ${props => props.color};
`;

export {Button, Text};