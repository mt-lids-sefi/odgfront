import { withStyles } from '@material-ui/core/styles';
import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import Cylon from '../LoadingComponents/Cylon';
import { Card, ListGroup } from 'react-bootstrap';
import axios from "axios";



const styles = theme => ({
    root: {
      flexGrow: 1
    },
    paper: { 
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    }
  });

class DetailsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file_id : this.props.file_id
        };
        this.loadDetails = this.loadDetails.bind(this);
    }

    async loadDetails()
    {
        let file_id = this.state.file_id
        const promise = await axios.get("http://localhost:8000/get_ds_details/"+file_id)
        const status = promise.status;
        if(status===200)
        {
            const data = promise.data;
            this.setState({details:data.details}); 
        }
    }

    async componentDidMount() {
        this.loadDetails();
    }

    render() {
        const { classes } = this.props;
        if (this.state.details == null) {
          return <Cylon/>
        }
        else{
            return (
                <div className={classes.root}>
					<Card style={{ width: '18rem' }}>
						<Card.Header>Detalles</Card.Header>
						<ListGroup variant="flush">
							<ListGroup.Item>Nombre: {this.state.details.name}</ListGroup.Item>
							<ListGroup.Item>Descripción: {this.state.details.description}</ListGroup.Item>
							{this.state.details.doc && <ListGroup.Item>Archivo: {this.state.details.doc}</ListGroup.Item>}
							{this.state.details.uploaded_at && <ListGroup.Item>Fecha de carga: {this.state.details.uploaded_at}</ListGroup.Item>}
							{this.state.details.lat_col && <ListGroup.Item>Columna latitud: {this.state.details.lat_col}</ListGroup.Item> }	
							{this.state.details.lon_col	&& <ListGroup.Item>Columna longitud: {this.state.details.lon_col}</ListGroup.Item>}
							{this.state.details.link_strategy && <ListGroup.Item>Estrategia de combinación: {this.state.details.link_strategy}</ListGroup.Item>}
							{this.state.details.source_a && <ListGroup.Item>Conjunto de datos A: {this.state.details.source_a}</ListGroup.Item>}
							{this.state.details.source_b && <ListGroup.Item>Conjunto de datos B: {this.state.details.source_b}</ListGroup.Item>}
							{this.state.details.distance && <ListGroup.Item>Máxima distancia: {this.state.details.distance}</ListGroup.Item>}
						</ListGroup>
					</Card>
                </div>
            );
        } 
    }
}

DetailsCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(DetailsCard);