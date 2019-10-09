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
      
      <div className={classes.root}>
         {renderRedirect()}
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            
            <Grid item xs>
              <Typography>CAPAS: Visualizar ambas fuentes en el mapa</Typography>
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
              <Typography>Unir ambos archivos según criterios a definir</Typography>
            </Grid>
            <Button variant="contained" className={classes.button} onClick={viewLinker}>
                Link
            </Button>
          </Grid>
        </Paper>
        
      </div>
    );
  }