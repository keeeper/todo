import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  
  html, body {
    font-size: 8px;
    font-family: "Roboto", "Arial", sans-serif;
    font-weight: 400;
    color: ${(props) => props.theme.colors.text}
  }

  html {
    background-color: ${(props) => props.theme.colors.background};
  }

  * {
    margin: 0px;
    padding: 0px;
    border: none;
    box-sizing: border-box;
    outline: none;
  }

  fieldset, img, a img {
    border: 0;
  }

  button {
    border: none;
    background: none;
    outline: none;
  }

  ul, li, ol, li {
    list-style-type: none
  }
`;

export default GlobalStyles;