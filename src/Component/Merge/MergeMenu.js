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
      maxWidth: 800,
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
           Combinar conjuntos de datos
          </Typography>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <Typography>Capas: Ver ambas fuentes de datos en un solo mapa. Cada conjunto 
                                        se diferenciará por color en el mapa. Se puede ver 
                                        de a uno o ambos al mismo tiempo.</Typography>
            </Grid>
            <Grid item>
            <Button variant="contained" className={classes.button} onClick={viewLayers}>
                Ver mapa
            </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <Typography>Combinar fuentes de datos: Diferentes diseños para combinar
                            dos fuentes de datos y crear una nueva fuente de datos en base a criterios
                            definidor por el usuario o la usuaria.
              </Typography>
            </Grid>
            <Grid item>
            <Button variant="contained" className={classes.button} onClick={viewLinker}>
                Combinar
            </Button>
            </Grid>
          </Grid>
        </Paper>
        
      </div>
      </Paper>
    );
  }