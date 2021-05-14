import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" style={{ color: "#ffffff" }} align="center">
      {"Copyright © "}
      <Link color="inherit" href="#!">
        Fpg Technologies and Solution, All rights reserved
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    padding: theme.spacing(6),
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
};

export default Footer;
