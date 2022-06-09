import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyles";
import { SocketIoProviderWrapper } from "./context/socket.context";

const theme = {
  colors: {
    green: "#88b04b",
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProviderWrapper>
          <SocketIoProviderWrapper>
            <App />
          </SocketIoProviderWrapper>
        </AuthProviderWrapper>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
