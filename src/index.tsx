import React from "react";
import ReactDOM from "react-dom";
import "./Client/index.css";
import App from "./Client/App";
import * as serviceWorker from "./serviceWorker";
import { makeServer } from "./Server/server";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import { lime } from "@mui/material/colors";

// THEME
const theme = createTheme({
  palette: {
    primary: {
      main: lime[400],
    },
    secondary: {
      main: blueGrey[300],
    },
  },
});

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
