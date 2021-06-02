import React, { useState,useEffect } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import axios from 'axios'
import {baseUrl} from '../../constants/index'
import { promises } from "fs";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #cccccc",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      flexGrow: 0.15,
    },
  })
);

interface ClockInModalProps {
  open: boolean;
  setOpen: any;
}

const ClockInModal: React.FC<ClockInModalProps> = ({
  open,
  setOpen,
}: ClockInModalProps) => {

const [clockIn,setclockIn] = useState(false)
const [loading,setLoading] = useState<boolean>(true)
  const classes = useStyles();
  const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);


useEffect(()=>{
open? getData() : console.log('')

},[open])
const [geo,leo] = useState<{lat:null | number,long:null |number}>({
    lat:null,
    long:null
})


const getData = async()=>{
    const token = localStorage.getItem('user-token')
    try{
        navigator.geolocation.getCurrentPosition(async({ coords })=>{
        let data = {"location":{
                        "long":coords.longitude,
                        "lat":coords.latitude
                    }}  
        const payload = await axios.post(`${baseUrl}clockin`,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
            console.log(payload,'logging payload')
        if(payload.status==200){
            setLoading(false)
            setclockIn(true)
        }
    })
    
    }catch(err){
        console.log(err)
    }

}

  return (
    <React.Fragment>
      <Modal
        open={open}
        className={classes.modal}
        // onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
          
        <Slide in={open}>
          <div className={classes.paper}>
            <Box textAlign="right" color="primary.main" mb={6}>
              <i
                className="fas fa-1x fa-times"
                onClick={() => setOpen(!open)}
              />
                {
                clockIn?<Box style={{textAlign:'center',marginTop:'1rem'}} > sucessfully clocked In </Box> : null
                }
            </Box>
           
            {loading && (
              <Box mt={8} mb={8}>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item container justify="center" xs={12}>
                    <CircularProgress size="6rem" color="secondary" />
                  </Grid>
                  <Grid item container justify="center" xs={12}>
                    <Typography
                      component="h1"
                      variant="h4"
                      color="primary"
                      gutterBottom
                    >
                      Processing...
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
             )} 
          </div>
        </Slide>
      </Modal>
    </React.Fragment>
  );
};

export default ClockInModal;
