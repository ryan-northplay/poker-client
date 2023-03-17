import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  #root {
    width: 100vw;
    height: 100%;
    min-height: 100vh;
    -webkit-overflow-scrolling: touch;
    color: ${({ theme }) => theme.colors.bodyText};
    font-family: ${({ theme }) => theme.fonts.bodyText};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;
