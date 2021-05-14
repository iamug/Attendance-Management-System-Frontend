import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    padding: theme.spacing(6),
  },
}));

const ResetPassword: React.FC = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium,
        iusto pariatur consequatur ab nostrum iure adipisci maiores repellat. Ex
        culpa nihil praesentium cum exercitationem expedita similique debitis
        earum quidem impedit.
      </p>
    </React.Fragment>
  );
};

export default ResetPassword;
