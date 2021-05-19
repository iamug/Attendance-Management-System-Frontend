import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Feat1 from "../../assets/images/feat1.png";
import Feat2 from "../../assets/images/feat2.png";
import Feat3 from "../../assets/images/feat3.png";
import headerBanner from "../../assets/images/headerBanner.png";
import phoneImg from "../../assets/images/phone.png";
import Feat1Feat2Line from "../../assets/images/feat1-feat2-line.png";
import Feat2Feat3Line from "../../assets/images/feat2-feat3-line.png";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <main style={{ paddingBottom: "100px" }}>
        <Container maxWidth={false} style={{ margin: "0px auto", padding: 0 }}>
          <div
            style={{
              minHeight: "60vh",
              background: `url(${headerBanner}) no-repeat bottom left/cover`,
            }}
          >
            <div style={{ margin: "0px auto" }}>
              <Toolbar>
                <Typography variant="h6"></Typography>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Grid item container justify="flex-end" xs={4} md={2}>
                    <Link to={"/login"} style={{ textDecoration: "none" }}>
                      <Button variant="contained" color="primary">
                        Sign in
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item container xs={5} md={2}>
                    <Link to={"/register"} style={{ textDecoration: "none" }}>
                      <Button variant="outlined" color="primary">
                        Sign up
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Toolbar>
            </div>

            <Container style={{ display: "flex" }}>
              <Grid container spacing={5} style={{ marginTop: "90px" }}>
                <Grid item container xs={12} md={7}>
                  <div>
                    <Box textAlign={{ xs: "center", md: "left" }}>
                      <Typography variant="h1" color="primary" gutterBottom>
                        <Box
                          fontWeight="fontWeightBold"
                          fontSize={{
                            xs: "2rem",
                            md: "3rem",
                            lg: "3rem",
                          }}
                          lineHeight={1.4}
                          color="primary"
                        >
                          Say{" "}
                          <Box component="span" color="primary.light">
                            Goodbye
                          </Box>
                          <br />
                          to the{" "}
                          <Box component="span" color="primary.light">
                            traditional
                          </Box>
                          <br />
                          attendance system.
                        </Box>
                      </Typography>

                      <Box my={3}>
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          paragraph
                        >
                          This platform is herewith a smarter solution to
                          replace the paper based attendence at work
                        </Typography>
                      </Box>
                    </Box>
                    <Grid
                      container
                      spacing={5}
                      direction="row"
                      justify="flex-start"
                    >
                      <Grid item container alignItems="center" xs={6} md={5}>
                        <Button
                          variant="contained"
                          size="large"
                          fullWidth
                          color="secondary"
                        >
                          Clock In
                        </Button>
                      </Grid>
                      <Grid item container alignItems="center" xs={6} md={5}>
                        <Button
                          variant="contained"
                          size="large"
                          fullWidth
                          color="secondary"
                        >
                          Clock Out
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Hidden smDown={true}>
                  <Grid item xs={12} md={5}>
                    <Box my="4">
                      <img
                        alt=""
                        src={phoneImg}
                        style={{ width: "100%", marginTop: "80px" }}
                      />
                    </Box>
                  </Grid>
                </Hidden>
              </Grid>
            </Container>
          </div>

          <Container style={{ marginTop: "100px" }}>
            <Grid container spacing={10}>
              <Grid item xs={12} md={6}>
                <img alt="" src={Feat1} style={{ width: "100%" }} />
              </Grid>
              <Grid
                item
                container
                xs={10}
                md={6}
                alignItems="center"
                style={{ margin: "0 auto" }}
              >
                <div>
                  <Typography
                    component="h1"
                    variant="h4"
                    color="primary"
                    gutterBottom
                  >
                    Signup and Login
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    paragraph
                  >
                    Follow the signup or Login icon in the header above to setup
                    your account and get started.
                  </Typography>
                </div>
              </Grid>
            </Grid>

            <div style={{ textAlign: "center" }}>
              <Hidden smDown={true}>
                <img src={Feat1Feat2Line} alt="" style={{ width: "48%" }} />
              </Hidden>
              <Hidden mdUp={true}>
                <hr style={{ margin: "80px" }} />
              </Hidden>
            </div>

            {/* <hr style={{ margin: "80px" }} /> */}

            <Grid
              container
              spacing={10}
              style={{ flexDirection: "row-reverse" }}
            >
              <Grid item container xs={12} md={6}>
                <img alt="" src={Feat2} style={{ width: "100%" }} />
              </Grid>
              <Grid
                item
                container
                xs={10}
                md={6}
                alignItems="center"
                style={{ margin: "0 auto" }}
              >
                <div>
                  <Typography
                    component="h1"
                    variant="h4"
                    color="primary"
                    gutterBottom
                  >
                    Clock In/Clock Out
                  </Typography>
                  <Typography variant="subtitle1" color="textPrimary" paragraph>
                    Pick from one of our sms plans and pay directly online from
                    your bank account.
                  </Typography>
                </div>
              </Grid>
            </Grid>

            <div style={{ textAlign: "center" }}>
              <Hidden smDown={true}>
                <img src={Feat2Feat3Line} alt="" style={{ width: "60%" }} />
              </Hidden>
              <Hidden mdUp={true}>
                <hr style={{ margin: "80px" }} />
              </Hidden>
            </div>

            <Grid container spacing={10}>
              <Grid item xs={12} md={6}>
                <img alt="" src={Feat3} style={{ width: "100%" }} />
              </Grid>
              <Grid
                item
                container
                xs={10}
                md={6}
                alignItems="center"
                style={{ margin: "0 auto" }}
              >
                <div>
                  <Typography
                    component="h1"
                    variant="h4"
                    color="primary"
                    gutterBottom
                  >
                    Track and export Data
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    paragraph
                  >
                    Follow the sign up or Login icon in the header above to set
                    up your account and get started.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default LandingPage;
