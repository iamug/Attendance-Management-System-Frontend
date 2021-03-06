import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),

    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    width: "100vW",
  },
  footerText: {
    color: "#ffffff",
    fontSize: 18,
  },

  "@media (max-width: 768px)": {
    footerText: {
      color: "#ffffff",
      fontSize: 10,
    },
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <footer className={classes.footer}>
        <Typography
          variant="body2"
          className={classes.footerText}
          align="center"
        >
          {"Copyright © "}
          <Link color="inherit" href="#!">
            Fpg Technologies and Solution, All rights reserved
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
