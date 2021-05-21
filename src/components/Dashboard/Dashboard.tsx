import React from 'react'
import Header from '../header/NavHeader'
import { makeStyles } from "@material-ui/core/styles";
import {Typography,Box,Button} from "@material-ui/core";
import background from '../../assets/images/background.svg'
import LineCharting from '../Visual/Visual'
import DoughtnutContainer from '../Visual/Doughnut/DoughnutContainer'
import Footer from '../footer/Footer'




const Dashboard:React.FC = () => {


 const classes = useStyles()

    return (
        <>
            <img src={background} className={classes.bkimage} alt="circular"/>
            <Header />
            <Typography variant="h3" style={{padding:"0rem 6rem",marginBottom:'7rem'}}>
                <h4 className={classes.name}>Welcome back, Paul</h4>
                <Box className={classes.buttons}>
                    <Button className={classes.check} style={{backgroundColor:'#02C12C'}} variant="contained" color="secondary">
                        Clock in
                    </Button> 
                    <Button className={classes.check} style={{backgroundColor:'#C5C1D1',marginLeft:'10px'}} variant="contained" color="secondary">
                        Clock out
                    </Button> 
                </Box>     
            </Typography>
            <LineCharting instance="Stats/Opening Hours" timing1="Punctual" timing2="Late"/>
            <Box component="span" className={classes.hours}>
                <h3 style={{color:"#5019EE"}}>Punctual days</h3>
                <h3 style={{color:"#5019EE"}}>Late Days</h3>
            </Box>
            <DoughtnutContainer/>
            <div style={{marginTop:'3rem'}}>
                <LineCharting instance="Stats/Closing Hours" timing1="close Early" timing2="close Normal/late"/>
            </div>
            <Footer/>           
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    bkimage:{
        position:"absolute",
        top:0,
        right:0,
        width:"27%",
    },
    hours:{
        display:'flex',
        justifyContent:'space-between',
        padding:"0rem 6rem",
        [theme.breakpoints.down("sm")]: {
        padding: "0rem 2rem",
      }

    },
    check:{
        width:'13rem',
        padding:'.8rem 0',
        fontSize:'11px',
        textTransform:"capitalize"
    },
    name: {
        fontSize:"17px",
        marginTop:"3rem"
    },
    buttons:{
        marginTop:'3rem',
        display:"flex",
        justifyContent:"center",
        color:"#fff"
    }

}))

export default Dashboard