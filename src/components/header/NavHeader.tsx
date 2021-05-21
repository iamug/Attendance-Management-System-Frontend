import React, { useState } from "react";
import {Link,useHistory} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, AppBar, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import menuImg from "../../assets/images/menu.png";
import NavOverlay from "../../components/header/NavOverlay";

const Header: React.FC = () => {
  const [popModal, setModal] = useState(false);

  const history = useHistory()

  const location = history.location.pathname.split('/')[1]

  const exitModal = (item: any) => {
    setModal(item);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <AppBar position="static" className={classes.appBar}> */}
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
            {/* <Typography variant="h3" className={classes.menuBox}>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Box className={classes.navText}>Home</Box>
                { location == 'home'?<div className={classes.smallDot}></div> : null }
              </Link>
            </Typography> */}
            <Typography variant="h3" className={classes.menuBox}>
              <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
                <Box className={classes.navText}>Dashboard</Box> 
                {location == 'dashboard'? <div className={classes.smallDot}></div> : null }   
              </Link>
            </Typography>
            <Typography variant="h3" className={classes.menuBox}>
              <Link to={"/activity"} style={{ textDecoration: "none" }}>
                <Box className={classes.navText}>Activities</Box>
                {location == 'activity'? <div className={classes.smallDot}></div> : null }         
              </Link>
            </Typography>
          </div>
          <div className={classes.avatar}></div>
        </Toolbar>
        <hr style={{width:'90%',transform:'translateY(-8px)'}} />
      {/* </AppBar> */}
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
    padding:50,
    paddingTop:0,
    paddingBottom:0,
    marginBottom:0,
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
    fontSize: 15,
    fontWeight: 500,
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
    [theme.breakpoints.up('sm')]: {
      display: "block",
    },
  },
  menuBox: {
    margin: 15,
  },
}));

export default Header;
