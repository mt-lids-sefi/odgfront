import { withStyles } from '@material-ui/core/styles';
import React,  {useEffect, Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
const styles = theme => ({
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
});


class About extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
        <div className={classes.root}>
         <Typography variant="h6" id="tableTitle" align="center">
           Acerca de ...
          </Typography>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <Typography> 
              Los datos abiertos están creciendo a cada momento en el mundo entero. 
              En Argentina, el gobierno abierto está avanzando y cada vez son más 
              los portales de datos abiertos disponibles para ser consultados por 
              cualquier persona. Se supone que unir y combinar dos o más fuentes de datos 
              (ya sean abiertos o no) puede proveer nueva información o conocimiento 
              que antes no se tenía. Para poder combinar diferentes conjuntos de datos, 
              se sugiere el empleo de técnicas de estadística y ciencias de la computación
               como minería de datos y aprendizaje automático. Si bien esta es una 
               práctica que se realiza en la actualidad por profesionales de ciencia 
               de datos, con este trabajo se invita a la comunidad en general a poder 
               utilizar la herramienta creada con dichos fines. En particular -y para 
               comenzar- este proyecto se centrará en datos con información georeferenciada 
               para poder encontrar problemáticas y situaciones de riesgo así como patrones 
               de comportamiento en diferentes tipos de mapas a lo largo de nuestra extensión geográfica.
               Esta aplicación fue desarrolada enteramente con hearramientas y lenguajes de código abierto.
               Más info en: https://github.com/mt-lids-sefi/
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
      </Paper>
    </div>
    );
  }
}


export default withStyles(styles)(About);
