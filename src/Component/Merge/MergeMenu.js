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
  
  const message = `opciones de merg `;



export default function MergeMenu(props) {
    const classes = useMenuStyles();
    const { handleRedirect, selected} = props;
    const [layers, setLayers] = React.useState(false)
    const [linkFiles, setLinkFiles] = React.useState(false)

    
    
    function viewLayers ()  {
      setLayers(true)
    }

    function viewLinker (){
      setLinkFiles(true)
    }


    function renderRedirect ()  {
      if (layers) {
        return <Redirect to={{pathname: '/multmap', mapProps:{files: selected}}} />
      }
      if (linkFiles){
        return <Redirect to={{pathname: '/linkfiles', mapProps:{files: selected}}} />
      }
    }

    return (
      <Paper className={classes.paper}>
      <div className={classes.root}>
         {renderRedirect()}
         <Typography variant="h6" id="tableTitle" align="center">
           Merging files: SALUD PBA + UNQ
          </Typography>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <Typography>Layers: Visualize both data sources on the map</Typography>
            </Grid>
            <Grid item>
            <Button variant="contained" className={classes.button} onClick={viewLayers}>
                View map
            </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <Typography>Merge data sources</Typography>
            </Grid>
            <Button variant="contained" className={classes.button} onClick={viewLinker}>
                Link
            </Button>
          </Grid>
        </Paper>
        
      </div>
      </Paper>
    );
  }