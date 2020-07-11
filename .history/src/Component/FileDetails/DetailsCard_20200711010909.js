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
			console.log(this.state.details.doc)
            return (
                <div className={classes.root}>
					<Card style={{ width: '18rem' }}>
						<Card.Header>Datasource details</Card.Header>
						<ListGroup variant="flush">
							<ListGroup.Item>Name: {this.state.details.name}</ListGroup.Item>
							<ListGroup.Item>Description: {this.state.details.description}</ListGroup.Item>
							{this.state.details.doc && <ListGroup.Item>File: {this.state.details.doc}</ListGroup.Item>}
							{this.state.details.uploaded_at && <ListGroup.Item>Upload date: {this.state.details.uploaded_at}</ListGroup.Item>}
							{this.state.details.lat_col && <ListGroup.Item>Latitude column: {this.state.details.lat_col}</ListGroup.Item> && <ListGroup.Item>Longitude column: {this.state.details.lon_col}</ListGroup.Item>}
							{this.state.details.link_strategy && <ListGroup.Item>Link strategy: {this.state.details.link_strategy}</ListGroup.Item>
																&& <ListGroup.Item>Dataset A: {this.state.details.source_a}</ListGroup.Item>
																&& <ListGroup.Item>Dataset B: {this.state.details.source_b}</ListGroup.Item>}
							{this.state.details.distance && <ListGroup.Item>Max distance: {this.state.details.distance}</ListGroup.Item>}
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