import React,{useState} from 'react'
import Header from '../header/NavHeader'
import { makeStyles } from "@material-ui/core/styles";
import {Typography,Box,Button} from "@material-ui/core";
import background from '../../assets/images/background.svg'
import LineCharting from '../Visual/Visual'
import DoughtnutContainer from '../Visual/Doughnut/DoughnutContainer'
import ClockInModal from './clockin'
import Footer from '../footer/Footer'
import {useAppSelector} from '../../app/hooks'
import {selectStateValues} from '../../app/auth-redux/authSlice'




const Dashboard:React.FC = () => {

const [open, setOpen] = useState<boolean>(false);

const {userData} = useAppSelector(selectStateValues)
console.log(userData,'user personal data')

 const classes = useStyles()

    return (
        <>
            <img src={background} className={classes.bkimage} alt="circular"/>
            <Header />
            <Typography variant="h3" style={{padding:"0rem 4rem",marginBottom:'7rem'}}>
                <Typography className={classes.name}>Welcome back, Paul</Typography>
                <Box className={classes.buttons}>
                    <ClockInModal open={open} setOpen={setOpen}/>
                    <Button onClick={()=>setOpen(true)} className={classes.check} style={{backgroundColor:'#02C12C'}} variant="contained" color="secondary">
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
        padding:"0rem 4rem",
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
        marginTop:"3rem",
        fontWeight:'bold',
        wordSpacing:'2px'
    },
    buttons:{
        marginTop:'3rem',
        display:"flex",
        justifyContent:"center",
        color:"#fff"
    }

}))

export default Dashboard