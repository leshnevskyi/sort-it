import {Wrapper, Caption, Value} from './components';

interface BarProps {
  caption: string;
  value: number | null;
  valueText: string | null;
  isOutOfRange: boolean;
}

const Bar = ({caption, value, valueText, isOutOfRange}: BarProps) => {
  return (
    <Wrapper value={value} isOutOfRange={isOutOfRange}>
      <Caption>{caption}</Caption>
      {valueText && <Value>{valueText}</Value>}
    </Wrapper>
  );
}

export default Bar;