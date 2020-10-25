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
        return <Redirect to={{pathname: '/similcols', mapProps:{files: selected}}} />
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
                                              al que se le quiere agregar información -el conjunto ‘base’-, 
              <Typography>Punto más cercano: para cada punto del conjunto de datos 
                                              encontrar el punto más cercano del conjunto de datos a sumar. 
              </Typography>
            </Grid>
            <Grid item>
            <Button variant="contained" className={classes.button} onClick={viewClosestPoint}>
                Combinar
            </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <Typography>Circunferencia alrededor de un punto: 
                          Para cada punto del mapa de un conjunto de datos 
                          se buscan los puntos en otro conjunto de datos que 
                          estén a cierta distancia (definida por el usuario
                           o la usuaria) formando así un círculo de radio 
                           determinado alrededor de cada punto.
              </Typography>
            </Grid>
            <Grid item>
            <Button variant="contained" className={classes.button} onClick={viewNearbyPoints}>
                Combinar
            </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <Typography>Semejanza de columnas:
                        Agregar información a un conjunto de datos por semejanza
                       de alguno de sus atributos. Implica decidir qué columnas
                        de cada conjunto de datos tienen que tener alguna similitud 
                        y armar reglas de semejanza para poder realizar la combinación. 
              </Typography>
            </Grid>
            <Grid item>
            <Button variant="contained" className={classes.button} onClick={viewSimilCols}>
                Combinar
            </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
      </Paper>
    );
  }