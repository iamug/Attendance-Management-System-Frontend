import React, { ReactElement,useEffect, useState } from 'react'
import {Typography,Box,Button} from "@material-ui/core";
import filter from '../../../assets/images/filter.svg'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import {actualMonth,monthsName} from '../../../constants'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LineChart from './chart'
import moment from 'moment';
import axios from 'axios'
import {baseUrl} from '../../../constants'



interface properties{
instance:string,
timing1?:string,
timing2:string;
update:boolean
}

const LineCharting:React.FC<properties> = ({instance,timing1,timing2,update}:properties):ReactElement => {
  const classes = useStyles();

  const [actualWeek,setActualWeek] = useState<any>([])
  const [weekTime,setWeekTime] = useState<any>([])
  const [check,setCheck] = useState<any>(false)
  const [showmonth,setShowmonth] = useState<any>(false)
  const [month,setMonth] = useState<{monthName:string}>({monthName:moment().format('MMMM')})
  const [clockin,setClockin] = useState<string[]>([])
  const [checker,setchecker] = useState(false)
  const tx:string[] = ['Tue Jun 08 2021 15:38:32 GMT+0100','Mon Jun 07 2021 02:38:32 GMT+0100','Tue May 20 2021 03:00:32 GMT+0100','Mon May 17 2021 06:05:32 GMT+0100','Tue May 18 2021 04:10:32 GMT+0100','Wed May 26 2021 07:30:32 GMT+0100','Tue May 27 2021 17:11:32 GMT+0100','Mon May 03 2021 09:10:32 GMT+0100','Tue May 04 2021 05:20:32 GMT+0100','Sun May 02 2021 11:04:32 GMT+0100','Sun Feb 21 2021 02:30:32 GMT+0100']

  const [monthlyClick,setmonthlyClick] = useState<number[]>([])
  const [result,setResult] = useState<any>({
    labels:[],
    data:[],
    value:'weekly'
  })

  const [yearlyAverage,setYearlyAverage] = useState<any>([])
  const [yearlyMonths,setYearlyMonths] = useState<any>([])


useEffect(()=> {
  setTimeout(
    getDataSet
  ,3000)
},[update])



useEffect(()=> {
  getMonthClick()
  getyearlyClick()
},[clockin,check])

useEffect(()=> {
  onChangeHandler()
},[check,monthlyClick])


  const getDataSet = async() => {
    const weekValue:any = []
    const weektime:any= []
    const clockInArr:any = []
    const token = localStorage.getItem('user-token')
        const {data:{payload:{data}}} = await axios.get(`${baseUrl}activities`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
              })
          data.map((act:any)=>{
              for(let key in act) {
                  if(key == 'clockedIn'){
                    return null
                  }else if(key == 'clockedOut'){
                  //  setClockOut(act['createdAt'])
                  clockInArr.push(act['createdAt'])
                  }         
          }
          })
            setClockin(clockInArr)
            clockInArr.map((value:any)=> {
            const currentWeek = (moment().week())
            if(moment(value).week() == currentWeek){
              const weekName = moment(value).toString().split(' ')[0]
              weekValue.push(weekName)
              const time = parseFloat(moment(value).format("HH:mm").split(':').join('.'))
              weektime.push(time)
          }else{
              console.log('')
          } 
          })
          setActualWeek(weekValue)
          setWeekTime(weektime)
          setResult({
            ...result,
            labels:weekValue,
            data:weektime,
          })
         
}

const removeDuplicate = (data:any) => {
let stringify = data.map(JSON.stringify)
let newValue = new Set(stringify)
let parse:any = JSON.parse
const nonDuplicate = Array.from(newValue,parse)
return nonDuplicate
}

const getMonthClick = () => {
  let arr:string[] = []
  const list:any= []
  //clockin
  clockin.map(dates=> {
  const getMonth = moment().month(month.monthName).format("M")
    if((1+(moment(dates).month())) == (+getMonth)){
      arr.push(dates)
    }
  })
    arr.sort().map((res:string)=> {
      const acc:number[] = []
      for(let key of arr){
        if(moment(res).week() == moment(key).week()){
          acc.push(+(moment(key).format("HH:mm").split(':').join('.')))
        }
      }
      list.push(acc)
    })
    const nondup:any = removeDuplicate(list)
    const val = nondup.map((arr:any)=>arr.reduce((sum:'',item:number)=>sum += item/arr.length,0));
    setmonthlyClick(val)

    arr = []
 
}

const getyearlyClick = () => {
  const yearname = []
  let currentYear: string[] = [];
  let list: any = [];
  const result: string[] = [];
  let getmonths: string[] = [];
  //clockin
  clockin.map((dates) => {
    if (
      moment(dates).toString().split(" ")[3] ==
      moment().toString().split(" ")[3]
    ) {
      currentYear.push(dates);
    }
  });

  monthsName.map((months: any) => {
    currentYear.map((names:string)=> {
      if(months == moment(names).toString().split(" ")[1]) {
        list.push(+moment(names).format("HH:mm").split(":").join("."))
        getmonths.push(moment(names).toString().split(" ")[1])
      }
    })
    list.length == 0? list=[] : result.push(list)
    list = []
  });
  const reduced = result.map((arr: any) =>
    arr.reduce((sum: "", item: number) => (sum += item / arr.length), 0)
  );
  setYearlyAverage(reduced)
  console.log(yearlyAverage,'average for yearly')
  //removing duplicate months from our getmonths
  const val = removeDuplicate(getmonths)
  setYearlyMonths(val)
};


const onChangeHandler = () => {
  if(result.value == 'weekly'){
    setShowmonth(false)
    return setResult({
      labels:actualWeek,
      data:weekTime,
      value:'weekly'
    })
  }
   else if(result.value == 'monthly'){
     setchecker(!checker)
    setShowmonth(true)
    return setResult({
      labels:['week1','week2','week3','week4','week5'],
      data:monthlyClick,
      value:'monthly'
    })
  }
  else if(result.value == 'yearly'){
    setShowmonth(false)
    return setResult({
      labels:yearlyMonths,
      data:yearlyAverage,
      value:'yearly'
    })
  }
}

const handleChange = (event: React.ChangeEvent<{value:any}>) => {
  setCheck(!check)
  // setCheck(prevVal=>())
  setResult({
    ...result,
    value: event.target.value
    })
}

const getMonth = () => {
  let val:any[] = []
  actualMonth.map((mth,index) => {
   val.push(<option key={index * Math.random()} value={mth}>{mth}</option>)
  })
  return val
}

const handleMonthly = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
  setCheck(!check)
  setMonth({
    monthName:event.target.value
  })

}




return (
        <> 
         <Box className={classes.stats}>
                <Typography className={classes.instance} variant="h5">{instance}</Typography>
                <Box style={{display:'flex',alignItems:'center'}}>
                    <img src={filter} alt="filter" width="20px"  />
                    <Box>
                        <FormControl variant="outlined" className={classes.formControl}>
                            {/* <InputLabel htmlFor="outlined-age-native-simple">{val=='weekly' || val=='monthly' || val=='yearly' ? null : 'weekly'}</InputLabel> */}
                            <Select
                            style={{padding:0}}
                            native
                            value={result.value}         
                            onChange={handleChange}
                            label="Age"
                            inputProps={{
                                name: 'age',
                                id: 'outlined-age-native-simple',
                            }}
                            >
                            {/* <option aria-label="None" value="" /> */}
                            <option value='weekly'>Weekly</option>
                            <option value='monthly'>Monthly</option>
                            <option value='yearly'>Yearly</option>
                            </Select>
                        </FormControl>
                    </Box> 
                </Box>
            </Box>
            {
              showmonth && 
              <FormControl variant="outlined" className={classes.formControlBox}>
                            <Select
                            style={{padding:0}}
                            native
                            value={month.monthName}         
                            onChange={handleMonthly}
                            label="Age"
                            inputProps={{
                                name: 'age',
                                id: 'outlined-age-native-simple',
                            }}
                            >
                              {
                                  getMonth()
                              }
                            </Select>
                        </FormControl>
            }  
            <Box className={classes.recenter}>
                <Box style={{display:'flex',alignItems:'center'}} >
                    <div className={classes.smallDotBlue}></div>
                    <span style={{marginLeft:'1rem'}} >{timing1}</span>
                </Box>
                <Box style={{display:'flex',marginLeft:'4rem',alignItems:'center'}} >
                    <div className={classes.smallDotOrange}></div>  
                    <span style={{marginLeft:'1rem'}} >{timing2}</span>
                </Box>
            </Box>
            <LineChart
              labels={result.labels}
              data={result.data}
              title="Closing Hour(s)"
            />
        </>
    )

}

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 70,
    marginLeft:'10px'
  }, 
  formControlBox: {
    margin: theme.spacing(0),
    minWidth: 70,
    marginLeft:'10px',
    paddingRight: "6rem",
    marginTop:'1rem',
    float:'right',
    [theme.breakpoints.down("xs")]: {
      float:'none',
      marginTop:'.5rem',
      marginLeft:'3rem', 
    }
  },
  smallDotBlue: {
    height: 10,
    width: 10,
    backgroundColor: "#5019EE",
    borderRadius: 10,
  },
  recenter: {
    display: "flex",
    padding: "0rem 4rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0 1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      marginTop:"1rem"
    },
  },
  instance:{
    color:"#5019EE",
     [theme.breakpoints.down("xs")]: {
         fontSize: "18px",
         alignSelf:'center',
         marginBottom:"2rem"
       },
   },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0rem 4rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0 1rem",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection:'column',
      alignItems: "start",
    },
  },
  smallDotOrange: {
    height: 10,
    width: 10,
    backgroundColor: "#EEB219",
    borderRadius: 10,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}),
);

export default LineCharting;