import {createGlobalStyle} from 'styled-components';

import colors from 'styles/colors';
import fontFaces from 'styles/fontFaces';

const GlobalStyle = createGlobalStyle`
  ${fontFaces} // Load fonts

  :root {
    --font-size-300: 1.8rem;
    --font-size-400: 2.1rem;
    --font-size-500: 2.3rem;
    --font-size-600: 2.6rem;
    --font-size-1000: 27rem;

    --icon-color: ${colors.pickledBluewood};
    --stroke-width: 4;

    --slow-transition-duration: 0.7s;
    --normal-transition-duration: 0.3s;
    --fast-transition-duration: 0.1s;

    height: 100%;
    width: 100%;
    font-family: 'SF Pro Display', sans-serif;
    font-size: clamp(7px, 0.58vw, 10px);
  }

  *, *::before, *::after {
    --bg-color: transparent;

    appearance: none;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background: var(--bg-color);
    color: var(--text-color);
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    border: none;
  }

  *:focus {
    outline: none;
  }

  body {
    --bg-color: ${colors.william};
    --text-color: ${colors.wafer};

    height: 100%;
    width: 100%;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  svg {
    fill: var(--icon-color);
    stroke: var(--icon-color);
    stroke-width: 0;
    transition: var(--normal-transition-duration);
  }

  #root {
    --v-padding: 5.8rem;
    --h-padding: var(--status-bar-width);

    --status-bar-width: clamp(2rem, 5.25vw, 15rem);

    height: 100%;
    max-width: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr var(--status-bar-width);
    overflow-x: hidden;
  }
`;

export default GlobalStyle;