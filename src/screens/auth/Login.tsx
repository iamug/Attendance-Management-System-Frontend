import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { url } from "inspector";
import backgroundImageHorizontal from "../../assets/images/bg_landscape.png";
import backgroundImageVertical from "../../assets/images/bg_portrait.png";
import Footer from "../../components/footer/Footer";
import { Checkbox, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
    // height: "70%",
    width: "30%",
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
    paddingLeft: "10px",
    outline: "none",
    height: "40px",
    width: "100%",
    border: "1px solid #8B82A3",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  formInputSpan: {
    fontSize: 13,
  },
  btmRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topPad: {
      paddingTop: 10
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
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
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
            <div className={classes.formInputs}>
              {/* <label className={classes.formLabel}>Username</label> */}
              <input
                className={classes.formInput}
                type="email"
                name="email"
                placeholder="Email"
                // value={values.username}
                // onChange={handleChange}
              />
              <input
                className={classes.formInput}
                type="password"
                name="password"
                placeholder="Password"
                // value={values.username}
                // onChange={handleChange}
              />
              {/* {errors.username && <p>{errors.username}</p>} */}
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
                <span className={classes.formInputSpan}>Forgot Password?</span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Login;
