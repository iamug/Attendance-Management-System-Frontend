import React from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import LandingPage from "./components/LandingPage";
import Header from "./components/header/NavHeader";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import ResetPassword from "./screens/auth/ResetPassword";
import Profile from "./screens/profile/Profile";
import Activity from "./screens/activity/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppSelector } from "./app/hooks";
import { selectStateValues } from "./app/auth-redux/authSlice";

const theme = createMuiTheme({
  palette: {
    common: {
      white: "#C5C1D1",
    },
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
  const auth = useAppSelector(selectStateValues);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/reset-password" component={ResetPassword} />
          <ProtectedRoute
            exact
            path="/profile"
            isAuthenticated={auth.isAuthenticated}
            component={Profile}
            authenticationPath={"/login"}
          />
          <ProtectedRoute
            exact
            path="/activity"
            isAuthenticated={auth.isAuthenticated}
            component={Activity}
            authenticationPath={"/login"}
          />
          {/* <Route path="/profile" component={Profile} /> */}
          <Route path="/activity" component={Activity} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
