import React,{useEffect,useState} from 'react'
import DoughnutType from './Doughnut'
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import {baseUrl} from '../../../constants/index'
import { darken } from '@material-ui/core';
import moment from 'moment'
import { convertCompilerOptionsFromJson } from 'typescript';
import ClockInModal from '../../LandingPage/ClockInModal';
import ClockOutModal from '../../LandingPage/ClockOutModal';




const DoughnutContainer = () => {
  const clockIn:number|string[] = []
  const clockOut: number|string[] = []
 const  values:number|string[] = []
const getData = async()=>{
    const token = localStorage.getItem('user-token')
  const {data:{payload:{data}}} = await axios.get(`${baseUrl}activities`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
    data.map((act:any)=>{
        for(let key in act) {
            if(key == 'clockedIn'){
                // console.log(clockIn)
               return clockIn.push(act['createdAt']) 
            }else if(key == 'clockedOut'){
                // console.log(act['createdAt'])
              return  clockOut.push(act['createdAt'])
            }         
    }
    })
    if(clockIn){
        // console.log(clockIn)
        const mome =  moment(values[1]).week()
        const current =  moment().week()
        console.log(mome,current)
    }
}

useEffect(()=>{
getData()
},[])


const myArray = [{Mon:'09:25'},{Tue:'08:59'},{Wed:'09:45'},{Thur:'08:10'},{Fri:'08:40'}]
//Note we push into this myArray when we fetch
const late:{}[] = []
const early = myArray.reduce((accu:{}[],val:{[key:string]:string|undefined}|any):{}[]=> {
     const detVal = '09:00'
     for(let key in val){
         if(val[key] > detVal ||  val[key].length > detVal.length ){
            late.push(val) 
         }else{
            accu.push(val)
         }
            // detVal > val[key]? accu.push(val) : late.push(val) 
     }
     return accu
},[])


function earlyStat() {
    const stat:string[] = []
    const final:any[] = []
    const unknown:number[] = []
    early.map((item:{[key:string]:string})=> {
        for (let keys in item){
            stat.push(item[keys])
        }
    })
    stat.map((slip:any)=>{
        unknown.push(slip.split(':').join('.'))

    })
  const sorted:number|any = unknown.sort()[unknown.length-1] * 1.2
  unknown.map((list:any)=>{
    final.push(+(sorted - list).toFixed(3))
  })
  return final
}

function lateStat() {
    const stat:string[] = []
    const final:any[] = []
    const unknown:number[] = []
    late.map((item:{[key:string]:string})=> {
        for (let keys in item){
            stat.push(item[keys])
        }
    })
    stat.map((slip:any)=>{
        unknown.push(slip.split(':').join('.'))
    })
    console.log(unknown,'logging unknwn value')
  return unknown
}




    return(        
        <Grid  container>
            <Grid
              item
              container
              sm={12}
              md={6}
              style={{marginBottom:"5rem"}}
            >
                <DoughnutType 
                    backgroundColor={["#EEB219", "#02C12C","#5019EE",'orangered','grey']} 
                    data={earlyStat()} 
                    myArray={early} 
                    left='true'
                    sort={true}
                />   
            </Grid>
            <Grid
              item
              container
              sm={12}
              md={6}
              style={{marginBottom:"5rem"}}
            >
                <DoughnutType 
                backgroundColor={["#EE4C19","#160547",'green','blue']} 
                data={lateStat()} 
                myArray={late}       
                right='true'
                sort={false}   
                />
            </Grid>

        </Grid>

      

    )

}


export default DoughnutContainer;