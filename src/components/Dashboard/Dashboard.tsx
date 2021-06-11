import React,{useEffect, useState} from 'react'
import Header from '../header/NavHeader'
import { makeStyles } from "@material-ui/core/styles";
import {Typography,Box,Button} from "@material-ui/core";
import background from '../../assets/images/background.svg'
import LineCharting from '../Visual/Visual'
import DoughtnutContainer from '../Visual/Doughnut/DoughnutContainer';
import ChartContainer from '../Visual/chart/chartContainer'
import ClockInModal from './clockin'
import Footer from '../footer/Footer'
import {useAppSelector} from '../../app/hooks'
import {selectStateValues} from '../../app/auth-redux/authSlice'

const Dashboard:React.FC = () => {

const [openCi, setOpenCi] = useState<boolean>(false);
const [openCo, setOpenCo] = useState<boolean>(false);
let [update,setUpdate] = useState(false)

const {userData} = useAppSelector(selectStateValues)
 const classes = useStyles()


 const showModal = (name:string) => {
    //  setUpdate(true)
    setUpdate(!update)
     if(name == 'clockIn'){
         setOpenCi(true)
         setOpenCo(false)
     }else if(name =='clockOut'){
         setOpenCo(true)
         setOpenCi(false)
     }
 }

    return (
        <>
            <img src={background} className={classes.bkimage} alt="circular"/>
            <Header />
            <Typography variant="h3" style={{padding:"0rem 4rem",marginBottom:'7rem'}}>
                <Typography className={classes.name}>Welcome back, {userData.firstname}</Typography>
                <Box className={classes.buttons}>
                    <ClockInModal openCi={openCi} setOpenCi={setOpenCi} openCo={openCo} setOpenCo={setOpenCo} name={`${userData.firstname} ${userData.lastname}`}/>
                    <Button onClick={()=>showModal('clockIn')} className={classes.check} style={{backgroundColor:'#02C12C'}} variant="contained" color="secondary">
                        Clock in
                    </Button> 
                    <Button onClick={()=>showModal('clockOut')}   className={classes.check} style={{backgroundColor:'#C5C1D1',marginLeft:'10px'}} variant="contained" color="secondary">
                        Clock out
                    </Button> 
                </Box>     
            </Typography>
            <LineCharting instance="Stats/Opening Hours" timing1="Punctual" timing2="Late" update={update}/>
            <Box component="span" className={classes.hours}>
                <h3 style={{color:"#5019EE"}}>Punctual days</h3>
                <h3 style={{color:"#5019EE"}}>Late Days</h3>
            </Box>
            <DoughtnutContainer update={update}/>
            <ChartContainer instance="Stats/Closing Hours" timing1="Close Early" timing2="Close Normal/late" update={update}/>
                {/* <div style={{marginTop:'3rem'}}>
                    <LineCharting instance="Stats/Closing Hours" timing1="close Early" timing2="close Normal/late"/>
                </div> */}
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
        textTransform:"capitalize",
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
        color:"#fff",
        // [theme.breakpoints.down("sm")]: {
        //     justifyContent:'left',
        //   }
    }

}))

export default Dashboard