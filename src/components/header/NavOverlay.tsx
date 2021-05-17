import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Clear from "@material-ui/icons/Clear";
import Modal from "@material-ui/core/Modal";

interface ModalProps {
  showModal: boolean;
  exitModal: any;
}

const NavOverlay: React.FC<ModalProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeModal = () => {
    props.exitModal(false);
  };

  const body = (
    <div className={classes.paper}>
      <IconButton
        aria-label="close"
        className={classes.clearBtn}
        onClick={() => closeModal()}
      >
        <Clear fontSize={"large"} />
      </IconButton>
      <Box className={classes.boxText}>Home</Box>
      <Box className={classes.boxText}>Dashboard</Box>
      <Box className={classes.boxText}>Activities</Box>
    </div>
  );
  return (
    <Modal
      open={props.showModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "50%",
    height: "100%",
    backgroundColor: "#160547",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3),
  },
  boxText: {
    color: "#ffffff",
    marginTop: 40,
    marginBottom: 40,
    fontSize: 16,
    fontWeight: 600,
  },
  clearBtn: {
    color: "#ffffff",
    display: "flex",
    // flexDirection: 'row',
    justifyContent: "flex-end",
    width: "100%",
  },
}));

export default NavOverlay;
