import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";


const useStyles = makeStyles((theme) => ({
  header: {

  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />

    </React.Fragment>
  );
};

export default Header;
