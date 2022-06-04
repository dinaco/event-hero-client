import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
  margin: 0;
  padding: 0;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  box-sizing:border-box;
  height:100%;
  }

  a {
  text-decoration: none;
  color: inherit;
  }
  `;

export default GlobalStyle;
