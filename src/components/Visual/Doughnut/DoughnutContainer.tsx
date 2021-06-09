import React,{useEffect,useState} from 'react'
import DoughnutType from './Doughnut'
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import {baseUrl} from '../../../constants/index'
import moment from 'moment'

const DoughnutContainer = () => {
   const [punctual,setPunctual] = useState<any>([])
   let [behind,setBehind] = useState<any>([])
    let behindData:number[] = []
   const early:any = []
   const late:any = []
   const extra:any = []
   const punctualData:any = []
   const [weekEarly,setWeekEarly] = useState([])
   const [weekLate,setWeekLate] = useState([])


    useEffect(()=>{
      mark()     
    },[])



    const mark = async() => {
        const clockIn:any[]=[]
        // const clockIn:any[]=["2021-06-01T11:55:08","2021-06-02T08:55:08","2021-06-03T07:55:08","2021-06-04T08:00:08","2021-06-05T13:55:08"]
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
                const current =  (moment().week())
                // console.log('current',':',current,'fetch',':',moment(clin).week())
            if(moment(clin).week() == current){
                    const weekName = moment(clin).toString().split(' ')[0]
                    const time = moment(clin).format("HH:mm")
                    values.push({[weekName]:time})
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
        punctualData.push(+(sorted - list).toFixed(3))
      })
      setPunctual(punctualData)


    //  Late time in the format 13:20
        const uni:string[] = []
        late.map((item:{[key:string]:string})=> {
            for (let keys in item){
                uni.push(item[keys])
            }
        })
        uni.map((slip:any)=>{
            behindData.push(+slip.split(':').join('.'))
         
        })
        setBehind(behindData)


        setWeekEarly(early)
        setWeekLate(late)     
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
                    data={punctual}
                    backgroundColor={["#EEB219", "#02C12C","#5019EE","#D3C5FB","#581845"]} 
                    left="true"
                    weekDay={weekEarly}
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
                    data={behind}
                    backgroundColor={["#EE4C19","#160547","grey","#182567","orange"]}
                    right="true" 
                    weekDay={weekLate}
                    sort={false}
                />
            </Grid>
        </Grid>
        
        
)
        

}


export default DoughnutContainer