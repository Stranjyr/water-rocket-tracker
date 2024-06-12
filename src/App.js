import './App.css';
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { DataGrid } from '@mui/x-data-grid';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';


// theme = responsiveFontSizes(theme);

class UserRecords{
  constructor(user_name, distance, rocket_name){
    this.user_name = user_name;
    this.distance = distance;
    this.rocket_name = rocket_name;
  }
}

function App() {
  const [timeOfFlight, setTimeOfFlight] = useState(0);
  const [lastDistance, setLastDistance] = useState(0);
  const [rocketName, setRocketName] = useState('');
  const [userName, setUserName] = useState('');
  const [userRecords, setUserRecords] = useState([])

  const columns = [
    { field: 'user_name', headerName: 'Name', width: 130 },
    { field: 'distance', headerName: 'Distance (Feet)', width: 130 },
    { field: 'rocket_name', headerName: 'Rocket Name', width: 130 },
  ];

  let theme = createTheme();
  theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    },
  };

  function runCalc(tof){
    if(isNaN(tof)){
      return 0
    }
    let projectile_time = (tof/5.0)
    return 32.2 * projectile_time * projectile_time
  }

  function addRecord(){
    let new_record = new UserRecords(userName, lastDistance, rocketName)
    let new_records = [...userRecords, new_record]
    new_records.sort(function(a, b) {
      var keyA = a.distance
      var keyB = b.distance
      return keyB - keyA
    })
    setUserRecords(new_records)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2} sx={{textAlign: 'center', mx: 'auto', m: 1}} >
      <Grid xs={12} >
        <Typography variant='h1' fullWidth >Water Rocket Calculations</Typography>
      </Grid>
      <Grid xs={2}>
        <TextField
            fullWidth
            id="outlined-number"
            label="Time of Flight (S)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setTimeOfFlight(event.target.value)
            }}
          />
      </Grid>
      <Grid xs={4}>
        <Button fullWidth variant='contained' onClick={() => {            
              setLastDistance(runCalc(timeOfFlight))
            }}>
            Calculate Rocket Height
        </Button>
      </Grid>
      <Grid xs={12}>
        <Divider fullWidth />
      </Grid>
      <Grid xs={2}>
        <ThemeProvider theme={theme}>
          <Typography variant="h3">{lastDistance} Feet</Typography>
        </ThemeProvider>
      </Grid>
      <Grid xs={2}>
        <TextField
            id="outlined-basic"
            label="Name"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setUserName(event.target.value)
            }}
          />
      </Grid>
      <Grid xs={2}>
        <TextField
            id="outlined-basic"
            label="Rocket Name"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setRocketName(event.target.value)
            }}
          />
      </Grid>
      <Grid xs={4}>
        <Button variant='contained' onClick={() => {            
              addRecord()
            }}>
            Save Record
        </Button>
      </Grid>
      <Grid xs={12}>
        <Divider/>
      </Grid>
      <Grid xs={12}>
        <DataGrid
          rows={userRecords}
          columns={columns}
          getRowId={() => crypto.randomUUID()}
        />
      </Grid>
      
      </Grid>
    </Box>
  );
}

export default App;
