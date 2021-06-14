import React from 'react'
import {Line} from 'react-chartjs-2'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface lines {
    labels:string[];
    data:any[];
    title:string
}

const LineChart:React.FC<lines> = ({labels,data,title}:lines) => {
    const classes = useStyles()

    return(
        <div className={classes.inner}>
            <Line
                type="line"
                data={{
                    legend:'line chart',
                    // labels:['Monday', 'Tuesday','Wednesday','Thursday','Friday'],
                    labels,
                    datasets: [{
                        // data: [9,11, 9, 10, 9.2,7],
                        data,
                        borderColor: "#8B82A3",
                        pointStyle: 'circle',
                        pointBackgroundColor: function(context:any){
                            var index = context.dataIndex
                            var value = context.dataset.data[index]
                            return value <= 9 ? '#5019EE' : '#EEB219'
                        },
                        pointBorderColor: 'transparent',
                        radius: 4,
                        pointHoverBackgroundColor: "rgba(100, 170, 100, 0.2)",
                        pointHoverRadius: 7,
                        borderWidth: 1.2,
                        pointHoverBorderColor: "rgb(100, 170, 100)",
                        pointHoverBorderWidth: 2,
                        lineTension: 0,
                    }],
                    
                }}
                height={120}  
                width={300}
                options={{
                   plugins: {
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
                    title: {
                        display: true,
                        text: title
                    },
                    
                    legend: {
                        display: false
                      },
                },
                    
                    // responsive: true,
                    // maintainAspectRatio: false,
                }}
            />

        </div>
    )

}

const useStyles = makeStyles((theme) => ({

    inner:{
        width:'90%',
        margin:'5rem auto',
        [theme.breakpoints.down("sm")]: {
         width: "95%",
         marginTop:'3rem'

       }
    },
  
}))


export default LineChart