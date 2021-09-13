import styled from 'styled-components';

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

export {Button};