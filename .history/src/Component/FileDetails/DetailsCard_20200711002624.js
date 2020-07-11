import { withStyles } from '@material-ui/core/styles';
import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import Cylon from '../LoadingComponents/Cylon';
import { Button } from 'react-bootstrap';



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
        this.loadFile();
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
						<Card.Header>Featured</Card.Header>
						<ListGroup variant="flush">
							<ListGroup.Item>Cras justo odio</ListGroup.Item>
							<ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
							<ListGroup.Item>Vestibulum at eros</ListGroup.Item>
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