import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, AppBar, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import menuImg from "../../assets/images/menu.png";
import NavOverlay from "../../components/header/NavOverlay";

const Header: React.FC = () => {
  const [popModal, setModal] = useState(false);

  const exitModal = (item: any) => {
    setModal(item);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense" className={classes.toolBar}>
          <IconButton
            onClick={() => setModal(true)}
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
      <NavOverlay showModal={popModal} exitModal={exitModal} />
    </div>
  );
};

const styles = {
  modal: {
    backgroundColor: "transparent",
    boxShadow: "none",
    display: "flex",
    overflow: "none",
    width: "50%",
    padding: "0",
    margin: "0",
    height: "100vh",
    minWidth: "50%",
    justifyContent: "center",
    zIndex: 1,
  },
  overlay: {
    backgroundColor: "#1cccc",
    padding: 0,
  },
  closeIcon: {
    fill: "#fff",
  },
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
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
