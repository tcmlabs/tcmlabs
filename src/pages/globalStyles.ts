import { injectGlobal } from 'styled-components';

injectGlobal`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
    box-sizing: border-box;
    font-family: "Lucida Console", Monaco, monospace;
  }

  body #___gatsby {
    height: 100%;

    > div {
      height: 100%;
    }
  }
`;
