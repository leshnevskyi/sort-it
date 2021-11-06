import {Wrapper, Caption, Value} from './components';

interface BarProps {
  caption: string;
  value: number | null;
  valueText: string | null;
}

const Bar = ({caption, value, valueText}: BarProps) => {
  return (
    <Wrapper value={value}>
      <Caption>{caption}</Caption>
      {valueText && <Value>{valueText}</Value>}
    </Wrapper>
  );
}

export default Bar;