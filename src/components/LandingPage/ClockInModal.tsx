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
import { Link } from "react-router-dom";

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
    },
  })
);

interface ClockInModalProps {
  open: boolean;
  setOpen: any;
}

const ClockInModal: React.FC<ClockInModalProps> = ({
  open,
  setOpen,
}: ClockInModalProps) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
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
                    <CircularProgress size="6rem" color="secondary" />
                  </Grid>
                  <Grid item container justify="center" xs={12}>
                    <Typography
                      component="h1"
                      variant="h4"
                      color="primary"
                      gutterBottom
                    >
                      Processing...
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
                        onClick={() => setLoading(true)}
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

export default ClockInModal;
