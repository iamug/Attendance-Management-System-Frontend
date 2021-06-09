import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { clockoutUserHomepage } from "../../app/clockOutAPI";

interface ClockInModalProps {
  open: boolean;
  setOpen: any;
}

const ClockOutModal: React.FC<ClockInModalProps> = ({
  open,
  setOpen,
}: ClockInModalProps) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const clockOut = async (): Promise<void> => {
    try {
      setLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async ({ coords }) => {
            let location = { lat: coords.latitude, long: coords.longitude };
            let res = await clockoutUserHomepage(email, location);
            if (res?.data && res?.status === 200)
              return handleSuccess(res.data.payload);
            if (res?.data && res?.status !== 200)
              return handleFailure(res.data.payload);
            else handleFailure("Error. Check internet connection.");
          },
          (error) => handleFailure("Error. " + error?.message)
        );
      }
    } catch (error) {
      handleFailure("Error. Check internet connection.");
      console.log("error", { error });
    }
  };

  const handleSubmitForm = (e?: React.FormEvent<HTMLFormElement>): void => {
    e && e.preventDefault();
    clockOut();
    return;
  };
  const handleSuccess = (msg: string): void => {
    setMsg(msg);
    setOpenSuccess(true);
  };

  const handleFailure = (msg: string): void => {
    setMsg(msg);
    setOpenFailure(true);
  };

  const handleCloseModal = (): void => {
    setLoading(false);
    setEmail("");
    setOpenSuccess(false);
    setOpenFailure(false);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Modal
        open={open}
        className={classes.modal}
        onClose={(e) => handleCloseModal()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Slide in={open}>
          <div className={classes.paper}>
            <Box textAlign="right" color="primary.main" mb={6}>
              <i
                className="fas fa-1x fa-times"
                onClick={() => handleCloseModal()}
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
                    {loading && !(openSuccess || openFailure) && (
                      <CircularProgress size="6rem" color="secondary" />
                    )}
                  </Grid>
                  <Grid item container justify="center" xs={12}>
                    <Box textAlign="center">
                      <Typography
                        component="h4"
                        variant="h5"
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
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}

            {!loading && (
              <>
                <form
                  noValidate
                  onSubmit={(e) => handleSubmitForm(e)}
                  autoComplete="off"
                >
                  <Grid
                    container
                    spacing={2}
                    direction="column"
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
                    <Grid item container justify="center" xs={10} md={10}>
                      <Button
                        variant="contained"
                        size="medium"
                        color="secondary"
                        onClick={(e) => handleSubmitForm()}
                      >
                        Clock Out
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

export default ClockOutModal;
