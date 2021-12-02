import {useState, useCallback} from 'react';

import {Wrapper, Button, InputField} from './components';

import {ReactComponent as ArrowIcon} from 'assets/icons/arrow.svg';

interface Props {
  initialValue?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const RangeInput = ({initialValue = 0, step = 1, onChange}: Props) => {
  const [value, setValue] = useState(initialValue);

  const incrementValue = useCallback(() => setValue(value => value + step), []);
  const decrementValue = useCallback(() => setValue(value => value - step), []);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number.parseInt(event.target.value);
      onChange?.(value);
      setValue(value);
    }, [] 
  );

  return (
    <Wrapper>
      <Button onClick={incrementValue}>
        <ArrowIcon/>
      </Button>
      <InputField value={value} onChange={handleInputChange} autoFocus/>
      <Button onClick={decrementValue}>
        <ArrowIcon style={{transform: 'rotate(180deg)'}}/>
      </Button>
    </Wrapper>
  );
}

export default RangeInput;