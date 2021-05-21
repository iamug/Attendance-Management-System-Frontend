import React from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import LandingPage from "./components/LandingPage";
import Header from "./components/header/NavHeader";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import ResetPassword from "./screens/auth/ResetPassword";
import Dashboard from "./components/Dashboard/Dashboard"
import Activity from "./components/Activity/Activity"
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
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/activities" component={Activity} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
