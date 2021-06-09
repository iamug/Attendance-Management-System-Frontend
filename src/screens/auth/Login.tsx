import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import backgroundImageHorizontal from "../../assets/images/bg_landscape.png";
import backgroundImageVertical from "../../assets/images/bg_portrait.png";
import Footer from "../../components/footer/Footer";
import { Checkbox, Box, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loginAsync, selectStateValues } from "../../app/auth-redux/authSlice";
import { getUserActivitiesAsync } from "../../app/activity-redux/activitySlice";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const auth = useAppSelector(selectStateValues);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setErrorMessage] = useState<string>("");

  useEffect(() => {
    async function checkAuth() {
      const userStatus = localStorage.getItem("user-token");
      if (userStatus) {
        history.push("/dashboard");
      }
    }
    checkAuth();
  }, []);

  const handleChangeEmail = (text: React.ChangeEvent<HTMLInputElement>) => {
    const email = text.currentTarget.value;
    setEmail(email);
  };

  const handleChangePassword = (text: React.ChangeEvent<HTMLInputElement>) => {
    const password = text.currentTarget.value;
    setPassword(password);
  };

  const loginUser = async () => {
    const result = await dispatch(loginAsync({ email, password }));
    console.log("result");
    console.log(result);
    if (result.payload.payload.auth) {
      history.push("/dashboard");
      dispatch(getUserActivitiesAsync());
    } else {
      setErrorMessage("Failed Authentication");
    }
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <form className="form" noValidate>
            <Typography
              variant="h4"
              color="primary"
              align="center"
              className={classes.header}
            >
              <Box color="primary.light">Login</Box>
            </Typography>
            <div className={classes.errorMsg}>
              <p>{message}</p>
            </div>
            <div className={classes.formInputs}>
              <input
                className={classes.formInput}
                type="email"
                name="email"
                placeholder="Email"
                onChange={(text) => handleChangeEmail(text)}
              />
              <input
                className={classes.formInput}
                type="password"
                name="password"
                placeholder="Password"
                onChange={(text) => handleChangePassword(text)}
              />
            </div>
            <div className={classes.btmRow}>
              <div>
                <Checkbox
                  value="checkedA"
                  inputProps={{ "aria-label": "Checkbox A" }}
                />
                <span className={classes.formInputSpan}>Remember me?</span>
              </div>
              <div className={classes.topPad}>
                <Link to={"/reset-password"} style={{ textDecoration: "none" }}>
                  <span className={classes.formInputSpan}>
                    Forgot Password?
                  </span>
                </Link>
              </div>
            </div>
            {auth.status === "idle" && (
              <Button
                variant="contained"
                color="primary"
                className={classes.authBtn}
                size={"large"}
                onClick={loginUser}
              >
                Sign In
              </Button>
            )}
            {auth.status === "loading" && (
              <CircularProgress
                className={classes.progressBar}
                color="primary"
              />
            )}
            <div className={classes.lastRow}>
              <span className={classes.lastRowTextBlack}>
                Already have an account?
              </span>
              <Link to={"/register"} style={{ textDecoration: "none" }}>
                <span className={classes.lastRowTextColor}>REGISTER?</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
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
    height: "95vh",
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
  },
  formInputs: {
    marginBottom: "0.5rem",
    width: "100%",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 24,
    paddingTop: 60,
    paddingBottom: 60,
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
    padding: 15,
    width: "30%",
    borderRadius: 10,
    textTransform: "capitalize",
  },
  errorMsg: {
    color: "red",
    margin: "0 auto",
  },

  "@media (max-width: 768px)": {
    container: {
      backgroundImage: `url(${backgroundImageVertical})`,
      height: "92vh",
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
      marginBottom: 20,
      fontSize: 20,
      paddingTop: 30,
      paddingBottom: 30,
    },
    formInputSpan: {
      fontSize: 11,
      cursor: "pointer",
    },
    authBtn: {
      backgroundColor: "#5019EE",
      display: "flex",
      margin: "0 auto",
      marginTop: 30,
      padding: 5,
      width: "35%",
      borderRadius: 10,
      textTransform: "capitalize",
    },
  },
}));

export default Login;
