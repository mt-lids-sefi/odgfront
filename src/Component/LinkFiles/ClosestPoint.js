import { makeStyles } from '@material-ui/core/styles';
import React,  {useEffect } from 'react';

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
  


export default function ClosestPoint(props) {
    const classes = useMenuStyles();
    const selected = props.location.mapProps.files;

    return(
        <div className={classes.root}>
        </div>
    );
}