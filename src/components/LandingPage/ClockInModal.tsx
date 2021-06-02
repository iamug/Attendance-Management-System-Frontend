import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { clockinUserHomepage } from "../../app/clockInAPI";
import { ClockInModalProps, position } from "../../models/clockIn";

const ClockInModal: React.FC<ClockInModalProps> = ({
  open,
  setOpen,
}: ClockInModalProps) => {
  const classes = useStyles();
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const clockIn = async () => {
    if (openSuccess) {
      console.log("already clocked in ");
      return;
    }
    try {
      setLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
          let location = { lat: coords.latitude, long: coords.longitude };
          let response = await clockinUserHomepage(email, location);
          if (response.status !== 200) handleFailure(response.data.payload);
          if (response.status == 200) handleSuccess(response.data.payload);
        });
      } else {
        console.log(" location failed");
      }
    } catch (error) {
      console.log({ error });
      //handleFailure(error.);
    }
  };

  const handleSuccess = (msg: string) => {
    //setLoading(false);
    setMsg(msg);
    setOpenSuccess(true);
    return false;
  };

  const handleFailure = (msg: string) => {
    //setLoading(false);
    setMsg(msg);
    setOpenFailure(true);
    return false;
  };

  return (
    <React.Fragment>
      <Modal
        open={open}
        className={classes.modal}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Slide in={open}>
          <div className={classes.paper}>
            <Box textAlign="right" color="primary.main" mb={6}>
              <i
                className="fas fa-1x fa-times"
                onClick={() => setOpen(!open)}
              />
            </Box>

            <Snackbar open={openSuccess || openFailure} autoHideDuration={6000}>
              <Alert severity={openSuccess ? "success" : "error"}>{msg}</Alert>
            </Snackbar>

            {loading && (
              <Box mt={8} mb={8}>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item container justify="center" xs={12}>
                    {!(openSuccess || openFailure) && (
                      <CircularProgress size="6rem" color="secondary" />
                    )}
                  </Grid>
                  <Grid item container justify="center" xs={12}>
                    <Typography
                      component="h1"
                      variant="h4"
                      color={
                        openSuccess
                          ? "secondary"
                          : openFailure
                          ? "error"
                          : "primary"
                      }
                      gutterBottom
                    >
                      {openSuccess
                        ? `${msg}`
                        : openFailure
                        ? `${msg}`
                        : "Processing..."}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}

            {!loading && (
              <>
                <form noValidate autoComplete="off">
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item container justify="center" xs={12} md={12}>
                      <TextField
                        id="outlined-basic"
                        label="Enter Email"
                        variant="outlined"
                        size="small"
                        value={email}
                        onChange={handleChangeEmail}
                        fullWidth
                      />
                    </Grid>
                    <Grid item container justify="center" xs={8} md={8}>
                      <Button
                        variant="contained"
                        size="medium"
                        color="secondary"
                        onClick={() => clockIn()}
                      >
                        Clock In
                      </Button>
                    </Grid>
                  </Grid>
                </form>
                <Box mt={5}>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item container justify="center" xs={6}>
                      <Link to="/register">
                        <Button variant="text" size="medium" color="primary">
                          Register
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item container justify="center" xs={6}>
                      <Link to="/login">
                        <Button variant="text" size="medium" color="primary">
                          Log in
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
          </div>
        </Slide>
      </Modal>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #cccccc",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      flexGrow: 0.15,
      borderRadius: "8px",
    },
  })
);

export default ClockInModal;
