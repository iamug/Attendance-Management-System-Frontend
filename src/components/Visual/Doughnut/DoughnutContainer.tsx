import React from 'react'
import DoughnutType from './Doughnut'
import Grid from "@material-ui/core/Grid";



const DoughnutContainer = () => {

    //fetch  data to populate the doughnut or receive as props

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
                    backgroundColor={["#EEB219", "#02C12C","#5019EE"]} 
                    data={[7*5,8*2.5,8.0]}  //this data ought to be sorted to allow for easy calculated calculations
                    myArray={[{mon:'8:00',wed:'7:00',thu:'8:30'  }]} 
                    left='true'
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
                backgroundColor={["#EE4C19","#160547"]} 
                data={[9.40,9.00]} 
                myArray={[{tue:'9:40',fri:'09:00'  }]}       
                right='true'   
                />
            </Grid>

        </Grid>
    )

}


export default DoughnutContainer;