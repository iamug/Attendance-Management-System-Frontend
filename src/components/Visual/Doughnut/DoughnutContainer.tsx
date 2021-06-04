import React,{useEffect,useState} from 'react'
import DoughnutType from './Doughnut'
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import {baseUrl} from '../../../constants/index'
import moment from 'moment'

const DoughnutContainer = () => {
   const [punctual,setPunctual] = useState<any>([])
   const [behind,setBehind] = useState<any>([])
   const early:any = []
   const late:any = []
   const extra:any = []

    useEffect(()=>{
      mark()     
    },[punctual])


    const mark = async() => {
        const clockIn:any[]=[]
        const clockOut:any[]=[]
        const values:any = []
        
        

        const token = localStorage.getItem('user-token')
        const {data:{payload:{data}}} = await axios.get(`${baseUrl}activities`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
              })
          data.map((act:any)=>{
              for(let key in act) {
                  if(key == 'clockedIn'){
                     return clockIn.push(act['createdAt']) 
                  }else if(key == 'clockedOut'){
                    return  clockOut.push(act['createdAt'])
                  }         
          }
          })
        
          //Here is all our clock in Data
          if(clockIn){
            clockIn.map(clin=> {
                const current =  moment().week()
            if(moment(clin).week() == current){
                    const weekName = moment(clin).toString().split(' ')[0]
                    const time = moment(clin).format("HH:mm")
                    values.push({[weekName]:time})
                    console.log(values)
                }else{
                    console.log('')
                }            
            })
        }

        // sorting the Array into puntual and late by the 9:00 time frame
        values.map((val:any) => {
            const detVal = '09:00'
            for(let key in val){
                if(val[key] > detVal ||  val[key].length > detVal.length ){
                     late.push(val)
                }else{
                    early.push(val)
                }
            }
        })

        // Early time in the format 07.45
        const stat:string[] = []
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
        setPunctual(+(sorted - list).toFixed(3))
      })


    //  Late time in the format 13:20
        const uni:string[] = []
        late.map((item:{[key:string]:string})=> {
            for (let keys in item){
                uni.push(item[keys])
            }
        })
        uni.map((slip:any)=>{
            setBehind(slip.split(':').join('.'))
            console.log(behind,'last data value')
        })
    
        const valuee:any = []
        // const extra:any = []
        let num = 0
        early.map((item:any)=>{
            for (let key in item){
                valuee.push(item[key])
                valuee.sort() 
                
            }
        })
        valuee.map((first:any)=> {
            early.map((sec:any,index:number)=> {
                for(let key in sec){
                   if(first == sec[key]){
                    extra.push(<p key={index* Math.random()+ num}>{key} - {sec[key]}</p>)
                    num++
                } else{
                    const v = ''
                   }    
                }
            })
        })
     
    }
    
    return (
        <Grid  container>
            <Grid
                item
                container
                sm={12}
                md={6}
                style={{marginBottom:"5rem"}}
            >
                <DoughnutType 
                    data={[punctual]}
                    backgroundColor={["#EEB219", "#02C12C"]} 
                    left="true"
                    weekDay={extra}
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
                    data={[behind]}
                    backgroundColor={["#EE4C19","#160547"]}
                    right="true" 
                    weekDay={late}
                    sort={false}
                />
            </Grid>
        </Grid>
        
        
)
        

}


export default DoughnutContainer