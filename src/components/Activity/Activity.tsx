import React from 'react'
import Header from '../header/NavHeader'
import {Typography,Box} from "@material-ui/core";


const Activity:React.FC = () => {



    return (
        <>
            <Header />
            <Typography variant="h3">
                <Box style={{marginTop:'5rem',fontSize:'16px'}}>Hello to the Activity Nav page</Box>      
            </Typography>
        </>
    )
}


export default Activity;