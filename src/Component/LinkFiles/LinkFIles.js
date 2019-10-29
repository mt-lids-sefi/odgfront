import { makeStyles } from '@material-ui/core/styles';
import React,  {useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';

const useMenuStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3),
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    }
  }));
  




export default function LinkFiles(props) {
    const classes = useMenuStyles();
    const selected = props.location.mapProps.files;
    const [closest, setClosest] = React.useState(false)
    const [nearbyPoints, setNearbyPoints] = React.useState(false)
    const [similCols, setSimilCols] = React.useState(false)
    
    
    function viewClosestPoint ()  {
      setClosest(true)
    }

    function viewNearbyPoints (){
      setNearbyPoints(true)
    }

    function viewSimilCols (){
        setSimilCols(true)
      }


    function renderRedirect ()  {
      if (closest) {
        return <Redirect to={{pathname: '/closestpoint', mapProps:{files: selected}}} />
      }
      if (nearbyPoints){
        return <Redirect to={{pathname: '/polygon', mapProps:{files: selected}}} />
      }
      if (similCols){
        //return <Redirect to={{pathname: '/linkfiles', mapProps:{files: selected}}} />
      }
    }

    return (
      
      <div className={classes.root}>
         {renderRedirect()}
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            
            <Grid item xs>
              <Typography>Punto más cercano</Typography>
            </Grid>
            <Grid item>
            <Button variant="contained" className={classes.button} onClick={viewClosestPoint}>
                Link
            </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <Typography>Puntos cercanos</Typography>
            </Grid>
            <Button variant="contained" className={classes.button} onClick={viewNearbyPoints}>
                Link
            </Button>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <Typography>Similitud de columnas</Typography>
            </Grid>
            <Button variant="contained" className={classes.button} onClick={viewSimilCols}>
                Link
            </Button>
          </Grid>
        </Paper>
      </div>
    );
  }