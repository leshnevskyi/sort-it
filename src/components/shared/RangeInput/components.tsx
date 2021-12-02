import styled from 'styled-components';

import colors from 'styles/colors';

const Wrapper = styled.fieldset`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
`;

const Button = styled.button.attrs({type: 'button'})`
  --icon-color: ${colors.rodeoDust};

  margin: -1rem;

  & > svg {
    width: 5rem;
    aspect-ratio: 1 / 1;
  }
`;

const InputField = styled.input`
  font-size: var(--font-size-600);
  font-weight: 700;
  text-align: center;
`;

export {Wrapper, Button, InputField};