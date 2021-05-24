import React, { ReactElement } from 'react'
import {Typography,Box,Button} from "@material-ui/core";
import filter from '../../assets/images/filter.svg'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LineChart from './lineChart'



interface properties{
instance:string,
timing1?:string,
timing2:string
}

const LineCharting:React.FC<properties> = ({instance,timing1,timing2}:properties):ReactElement => {


const classes = useStyles();
const [state, setState] = React.useState<{ name: string | number; choosen: string }>({
    name: '',
    choosen: '',
});



const handleChange = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
    const name = event.target.name as keyof typeof state;
    setState({
    ...state,
    choosen: event.target.value,
    });
};
const val = state.choosen
return (
        <>
            <Box className={classes.stats}>
                <Typography style={{color:"#5019EE"}} variant="h5">{instance}</Typography>
                <Box style={{display:'flex',alignItems:'center'}}>
                    <img src={filter} alt="filter" width="20px"  />
                    <Box>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">{val=='weekly' || val=='monthly' || val=='yearly' ? null : 'weekly'}</InputLabel>
                            <Select
                            style={{padding:0}}
                            native
                            value={state.choosen}
                            onChange={handleChange}
                            label="Age"
                            inputProps={{
                                name: 'age',
                                id: 'outlined-age-native-simple',
                            }}
                            >
                            <option aria-label="None" value="" />
                            <option value='weekly'>Weekly</option>
                            <option value='monthly'>Monthly</option>
                            <option value='yearly'>Yearly</option>
                            </Select>
                        </FormControl>
                    </Box> 
                </Box>
            </Box>
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
            <LineChart/>
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
  smallDotBlue: {
    height: 10,
    width: 10,
    backgroundColor: "#5019EE",
    borderRadius: 10,
  },
  recenter:{
    display:'flex',
    padding:"0rem 4rem",
    [theme.breakpoints.down("sm")]: {
        padding: "0 2rem",
      },
  },
  stats:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    padding:"0rem 4rem",
    [theme.breakpoints.down("sm")]: {
        padding: "0 2rem",
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