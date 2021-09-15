import {
  NavBarWrapper, 
  NavLinkList, 
  NavLink, 
  EmphasizedText
} from './styled';

import {sortingAlgorithms} from 'algorithms';

const NavBar = () => {
  const renderedNavLinks = sortingAlgorithms.map(sortingAlgorithm => {
    return (
      <NavLink 
        key={sortingAlgorithm.name} 
        to={sortingAlgorithm.url || '/'}
      >
        <EmphasizedText>{sortingAlgorithm.name}</EmphasizedText>&nbsp;sort
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