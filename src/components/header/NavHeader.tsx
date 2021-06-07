import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, AppBar, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import menuImg from "../../assets/images/menu.png";
import NavOverlay from "../../components/header/NavOverlay";
import dropdown from '../../assets/images/dropdown.svg'
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  const [popModal, setModal] = useState(false);

  const history = useHistory();

  const location = history.location.pathname.split("/")[1];

  const exitModal = (item: any) => {
    setModal(item);
  };

  const logoutBotton = ():any => {
    // localStorage.removeItem('user-token')
    localStorage.clear()
    history.push('/')
  }

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
          <div style={{display:'flex',alignItems:'center'}}>
            <div className={classes.avatar} style={{marginRight:'10px'}}></div>
            <ClickAwayListener
              mouseEvent="onMouseDown"
              touchEvent="onTouchStart"
              onClickAway={handleClickAway}
            >
            <div className={classes.root2}>
            <button type="button" style={{border:'none'}} onClick={handleClick}>
              <img src={dropdown} width="15px"/>
            </button>
            {open ? (
              <div className={classes.dropdown}>
                <Link to={"/profile"} style={{ textDecoration: "none" }}>
                  <Box >Profile</Box> 
                </Link>
                <hr/>
                <Box onClick={logoutBotton} style={{ textDecoration: "none",cursor:'pointer' }}>
                  <Box >Logout</Box> 
                </Box>
              </div>
            ) : null}
            </div>
            </ClickAwayListener>
          </div>
        </Toolbar>
        <hr style={{width:'95%',transform:'translateY(-8px)'}} />
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
     root2: {
      position: 'relative',
    },
    dropdown: {
      position: 'absolute',
      fontSize:'12px',
      top: 29,
      right: 0,
      left: 0,
      zIndex: 1,
      border: '1px solid',
      borderRadius:'5px',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      width:'80px',
      marginLeft:'-22px',
      objectFit:'cover',
    },
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
    padding:30,
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
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  menuBox: {
    margin: 15,
  },
}));

export default Header;
