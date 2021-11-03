import {BackgroundHeading, Wrapper} from './styled';

interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string,
  backgroundText?: string;
}

const ContentWrapper = ({
  children, className, backgroundText
}: ContentWrapperProps) => {
  return (
    <Wrapper className={className}>
      <BackgroundHeading text={backgroundText}/>
      {children}
    </Wrapper>
  );
}

export default ContentWrapper;