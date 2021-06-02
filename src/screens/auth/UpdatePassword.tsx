import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import backgroundImageHorizontal from "../../assets/images/bg_landscape.png";
import backgroundImageVertical from "../../assets/images/bg_portrait.png";
import Footer from "../../components/footer/Footer";
import { Checkbox, Box, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { baseUrl } from "../../constants";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

const UpdatePassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const { search } = useLocation();
  const { token, email } = queryString.parse(search);
  const classes = useStyles();
  const [showSentView, setSentView] = useState<boolean>(false);

  const resetPassword = async () => {
    if (password !== cpassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/update-password`, {
        password,
        token,
        email,
      });
      console.log(response.data);
      setLoading(false);
      if (!response.data.payload.error) {
        console.log(response.data.payload.message);
        setSentView(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response.data.payload?.error) {
        alert(error.response.data.payload.message);
      }
    }
  };

  const handleChangePassword = (text: React.ChangeEvent<HTMLInputElement>) => {
    const password = text.currentTarget.value;
    setPassword(password);
  };

  const handleChangeCP = (text: React.ChangeEvent<HTMLInputElement>) => {
    const password = text.currentTarget.value;
    setCPassword(password);
  };

  return (
    <React.Fragment>
      {!showSentView ? (
        <div className={classes.container}>
          <div className={classes.formContainer}>
            <form className="form" noValidate>
              <Typography
                variant="h4"
                color="primary"
                align="center"
                className={classes.header}
              >
                <Box color="primary.light">Update Password</Box>
              </Typography>
              <Box color="primary.light" className={classes.subHeader}>
                We will send your Password to your email
              </Box>

              <div className={classes.formInputs}>
                <input
                  className={classes.formInput}
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  onChange={handleChangePassword}
                />
              </div>
              <div className={classes.formInputs}>
                <input
                  className={classes.formInput}
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  onChange={handleChangeCP}
                />
              </div>
              {!isLoading && (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.authBtn}
                  size={"large"}
                  onClick={resetPassword}
                >
                  Update
                </Button>
              )}
              {isLoading && (
                <CircularProgress
                  className={classes.progressBar}
                  color="primary"
                />
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.formContainer}>
            <form className="form" noValidate>
              <Typography
                variant="h4"
                color="primary"
                align="center"
                className={classes.header}
              >
                <Box color="primary.light">Password Updated Successfully</Box>
              </Typography>
              <Box color="primary.light" className={classes.subHeader}>
                Kindly{" "}
                <Link to={"/login"} style={{ textDecoration: "none", color:'red' }}>
                  login
                </Link>{" "}
                to continue
              </Box>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  progressBar: {
    display: "flex",
    margin: "0 auto",
    marginTop: 50,
  },
  lastRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingBottom: 60,
  },
  lastRowTextColor: {
    color: "#5019EE",
    fontWeight: 600,
    cursor: "pointer",
  },
  lastRowTextBlack: {
    color: "#160547",
    fontWeight: 600,
  },
  container: {
    backgroundImage: `url(${backgroundImageHorizontal})`,
    height: "92vh",
    width: "100vw",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    borderRadius: 15,
    marginLeft: "-30%",
    width: "25%",
    height: "60%",
  },
  formInputs: {
    marginBottom: "0.5rem",
    width: "100%",
  },
  header: {
    fontWeight: "bold",
    // marginBottom: 20,
    fontSize: 24,
    marginTop: 60,
    marginBottom: 10,
  },
  subHeader: {
    textAlign: "center",
    marginBottom: 50,
    marginTop: 20,
    color: "#000000",
  },
  formInput: {
    display: "block",
    outline: "none",
    height: "40px",
    width: "100%",
    border: "1px solid #8B82A3",
    borderRadius: "10px",
    marginBottom: "20px",
    padding: 10,
  },
  formInputSpan: {
    fontSize: 13,
    cursor: "pointer",
  },
  btmRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topPad: {
    paddingTop: 10,
  },
  authBtn: {
    backgroundColor: "#5019EE",
    display: "flex",
    margin: "0 auto",
    marginTop: 50,
    marginBottom: 50,
    padding: 15,
    width: "30%",
    borderRadius: 5,
    textTransform: "capitalize",
  },

  "@media (max-width: 768px)": {
    container: {
      backgroundImage: `url(${backgroundImageVertical})`,
      height: "95vh",
      width: "100vw",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    formContainer: {
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderRadius: 15,
      marginLeft: 0,
      width: "70%",
    },
    formInput: {
      display: "block",
      outline: "none",
      height: "20px",
      width: "90%",
      border: "1px solid #8B82A3",
      borderRadius: "10px",
      marginBottom: "20px",
      //   padding: 10,
    },
    lastRowTextColor: {
      color: "#5019EE",
      fontWeight: 600,
      cursor: "pointer",
      fontSize: 12,
    },
    lastRowTextBlack: {
      color: "#160547",
      fontWeight: 600,
      fontSize: 12,
    },
    header: {
      fontWeight: "bold",
      //   marginBottom: 20,
      fontSize: 20,
      paddingTop: 30,
      //   paddingBottom: 30,
    },
    formInputSpan: {
      fontSize: 11,
      cursor: "pointer",
    },
    authBtn: {
      backgroundColor: "#5019EE",
      display: "flex",
      margin: "0 auto",
      marginTop: 50,
      padding: 5,
      width: "35%",
      borderRadius: 5,
      textTransform: "capitalize",
    },
    subHeader: {
      textAlign: "center",
      marginBottom: 50,
      color: "#000",
      fontSize: 12,
      paddingRight: 30,
      paddingLeft: 30,
    },
  },
}));

export default UpdatePassword;
