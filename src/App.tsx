import React from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import LandingPage from "./components/LandingPage";
import Header from "./components/header/Header";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5019EE",
      main: "#160547",
    },
    secondary: {
      main: "#02C12C",
      contrastText: "#ffffff",
    },
  },
  overrides: {
    MuiButton: {
      outlinedPrimary: {
        color: "#160547",
      },
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        {/* <Header /> */}
        <Switch>
          <Route path="/" component={LandingPage} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
