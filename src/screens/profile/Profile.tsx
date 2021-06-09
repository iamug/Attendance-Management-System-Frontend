import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Header from "../../components/header/NavHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AvatarImg from "../../assets/images/avatar2.png";
import Avatar from "@material-ui/core/Avatar";
import Footer from "../../components/footer/Footer";
import { red, deepPurple } from "@material-ui/core/colors";
import { useAppSelector } from "../../app/hooks";
import { selectStateValues } from "../../app/auth-redux/authSlice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      height: theme.spacing(30),
      width: theme.spacing(30),
      margin: "0 auto",
    },
    resetPasswordBtn: {
      color: theme.palette.getContrastText(red[900]),
      backgroundColor: red[900],
      "&:hover": {
        backgroundColor: red["A700"],
      },
    },
    logoutBtn: {
      color: theme.palette.getContrastText(deepPurple[600]),
      backgroundColor: deepPurple[600],
      "&:hover": {
        backgroundColor: deepPurple[900],
      },
    },
  })
);

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const { userData = false } = useAppSelector(selectStateValues);
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };

  const goToResetScreen = () => {
    history.push('/reset-password')
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Container style={{ margin: "60px auto" }}>
          <Grid container spacing={10} justify="center">
            <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
              {/* <img alt="" src={AvatarImg} style={{ height: "256px" }} /> */}
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={<i className="fas fa-2x fa-camera"></i>}
              >
                <Avatar
                  alt="avatar"
                  src={AvatarImg}
                  className={classes.large}
                />
              </Badge>
              {/* <Avatar alt="" src={AvatarImg} className={classes.large} /> */}
            </Grid>
          </Grid>
          <Grid
            container
            spacing={5}
            direction="row"
            justify="center"
            style={{ margin: "30px  0px" }}
          >
            <Grid item container alignItems="center" xs={12} md={5}>
              <div>
                <Box component="span" mr={4}>
                  <Typography
                    component="span"
                    variant="h5"
                    color="primary"
                    gutterBottom
                  >
                    Name:
                  </Typography>
                </Box>

                <Typography
                  component="span"
                  variant="subtitle1"
                  color="textSecondary"
                  paragraph
                >
                  {userData && `${userData.firstname} ${userData.lastname}`}
                </Typography>
              </div>
            </Grid>
            <Grid item container alignItems="center" xs={12} md={5}>
              <div>
                <Box component="span" mr={4}>
                  <Typography
                    component="span"
                    variant="h5"
                    color="primary"
                    gutterBottom
                  >
                    Email:
                  </Typography>
                </Box>

                <Typography
                  component="span"
                  variant="subtitle1"
                  color="textSecondary"
                  paragraph
                >
                  {userData && userData.email}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={5} direction="row" justify="center">
            <Grid item container alignItems="center" xs={10} md={3}>
              <Button
              onClick={goToResetScreen}
                variant="contained"
                size="large"
                fullWidth
                color="primary"
                className={classes.resetPasswordBtn}
              >
                Reset Password
              </Button>
            </Grid>
            <Grid item container alignItems="center" xs={10} md={3}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                color="primary"
                className={classes.logoutBtn}
                onClick={() => logout()}
              >
                Log Out
              </Button>
            </Grid>
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default ProfilePage;
