import {useEffect} from 'react';
import {useLocation} from 'react-router';

import {
  NavBarWrapper, 
  NavLinkList, 
  NavLink, 
  EmphasizedText
} from './styled';

import {sortingAlgorithms} from 'algorithms';
import {useSorting} from 'hooks';

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

  const locationUrl = useLocation().pathname;
  const {setSortingAlgorithmIndex} = useSorting();

  useEffect(() => {
    setSortingAlgorithmIndex(sortingAlgorithms.findIndex(sortingAlgorithm => {
      return sortingAlgorithm.url === locationUrl;
    }));
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