import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, AppBar, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import menuImg from "../../assets/images/menu.png";
import { Modal } from "react-responsive-modal";

const Header: React.FC = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense" className={classes.toolBar}>
          <IconButton
            onClick={() => {
              setModalVisible(true)
            }}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src={menuImg} alt="menu" className={classes.img} />
          </IconButton>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h3" className={classes.menuBox}>
              <Box className={classes.navText}>Home</Box>
              <div className={classes.smallDot}></div>
            </Typography>
            <Typography variant="h3" className={classes.menuBox}>
              <Box className={classes.navText}>Dashboard</Box>
            </Typography>
            <Typography variant="h3" className={classes.menuBox}>
              <Box className={classes.navText}>Activities</Box>
            </Typography>
          </div>
          <div className={classes.avatar}></div>
        </Toolbar>
      </AppBar>

    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // width: '100%'
  },
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    color: "black",
  },
  appBar: {
    backgroundColor: "transparent",
    padding: 5,
  },
  navText: {
    color: "#160547",
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 5,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  avatar: {
    height: 40,
    width: 40,
    backgroundColor: "black",
    borderRadius: 50,
    marginRight: 20,
  },
  toolBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    height: 15,
  },
  smallDot: {
    height: 10,
    width: 10,
    backgroundColor: "#5019EE",
    borderRadius: 10,
    margin: "0 auto",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  menuBox: {
    margin: 30,
  },
}));

export default Header;
