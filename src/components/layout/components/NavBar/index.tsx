import {
  NavBarWrapper, 
  NavLinkList, 
  NavLink, 
  EmphasizedText
} from './styled';

const algoNames = [
  'bubble',
  'selection',
  'shell',
  'merge',
  'quick',
  'counting',
];

const NavBar = () => {
  const renderedNavLinks = algoNames.map(algoName => {
    return (
      <NavLink 
        key={algoName} 
        to={`${algoName}-sort`}
      >
        <EmphasizedText>{algoName}</EmphasizedText>&nbsp;sort
      </NavLink>
    );
  });

  return (  
    <NavBarWrapper>
      <NavLinkList>
        {renderedNavLinks}
      </NavLinkList>
    </NavBarWrapper>
  );
}

export default NavBar;