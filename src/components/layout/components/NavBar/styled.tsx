import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

import colors from 'styles/colors';

const NavBarWrapper = styled.nav`
  position: relative;
  display: flex;
`;

const NavLinkList = styled.ul`
  position: relative;
  padding-top: var(--v-padding);
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

const StyledNavLink = styled(NavLink)`
  position: relative;
  display: flex;
  font-size: var(--font-size-600);
  font-weight: 300;
  font-style: italic;
  text-transform: capitalize;

  &.active {
    --text-color: ${colors.william};
  }

  &::before { 
    --h-margin: -2.2rem;
   
    --bg-color: linear-gradient(to bottom, ${colors.rodeoDust}, transparent);
    
    content: '';
    position: absolute;
    top: calc(0px - var(--v-padding));
    left: var(--h-margin);
    right: var(--h-margin);
    height: 100vh;
    transform: translateY(-100%);
    transition: var(--fast-transition-duration);
    z-index: -1;
  }

  &.active {
    --text-color: ${colors.pickledBluewood};
  }

  &.active::before {
    transform: translateY(0);
    transition: var(--normal-transition-duration);
  }
`;

const EmphasizedText = styled.em`
  font-weight: 800;
  font-style: normal;
`;

export {
  NavBarWrapper, 
  NavLinkList,
  StyledNavLink as NavLink,
  EmphasizedText,
};