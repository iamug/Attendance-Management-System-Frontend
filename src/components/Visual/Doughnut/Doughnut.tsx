import React, {useState} from 'react'
import {Doughnut} from 'react-chartjs-2'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { LeakAddTwoTone } from '@material-ui/icons';
import first from '../../../assets/images/first.svg'
import second from '../../../assets/images/second.svg'
import third from '../../../assets/images/third.svg'
import forth from '../../../assets/images/forth.svg'


interface DoughnutInt {
    backgroundColor:string[],
    data:number[],
    myArray:[{}],
    right?:string,
    left?:string
}
const DoughnutType:React.FC<DoughnutInt> = ({backgroundColor,data,myArray,right,left}:DoughnutInt):any => {


   const  getValue = ():any =>{
    let num = 0
    const dataSet:any[] = []
        myArray.map((item: any, index) => {
            for(let keys in item){  
                dataSet.push(<p style={{color:backgroundColor[num]}}>{keys} - {item[keys]}</p>)
                num++
            }
        }) 
        return dataSet
    }
  

    const classes = useStyles()

    return(
        <div className={classes.extension}>
            <div style={{display:left? 'block' :'none'}}>
                <img src={first} style={{position:'absolute',top:'3%',left:'0'}}/>
                <img src={second} style={{position:'absolute',top:'70%',left:'0'}}/>
            </div>
            <div style={{display:right? 'block' :'none'}}>
                <img src={third} style={{position:'absolute',top:'3%',right:'0'}}/>
                <img src={forth} style={{position:'absolute',top:'70%',right:'0'}}/>
            </div>
        <div  className={classes.innerWrapper}>
            
            <div style={{position:'relative'}}>
            <Doughnut
            type='doughnut'
                data={{
                    datasets: [{
                      label: "Population (millions)",
                      backgroundColor,
                      data,

                    }]
                    
                }}
                height={200}
                width={300}
                options={{
                    scales: {
                        xAxes: [{
                           gridLines: {
                              display: false
                           }
                        }],
                        yAxes: [{
                           gridLines: {
                              display: false
                           }
                        }]
                   },
                    legend: {
                        display: false
                      },
                }}
            />
            <h3 style={{position:'absolute',top:'40%',left:'45%'}}>Weekly</h3>
        </div>
        <div>{getValue()} </div>           
    </div>
    </div>
    )

}

const useStyles = makeStyles((theme) => ({

innerWrapper:{
    width:'80%',
    margin:'auto',
    display:'flex',
    boxShadow:"0px 71.5038px 143.008px rgba(80, 25, 238, 0.05)",
    justifyContent:'space-evenly',
    alignItems:'center',
    backgroundColor:'whitesmoke',
    borderRadius:'15px',
    position:'relative'
    // [theme.breakpoints.down("sm")]: {
    //     width: "90%",
    //   },
},

extension:{
    [theme.breakpoints.down("sm")]: {
       width: "100%",
      },
   position:'relative',
   width:'80%',
   margin:'auto'
}


}))


export default DoughnutType;