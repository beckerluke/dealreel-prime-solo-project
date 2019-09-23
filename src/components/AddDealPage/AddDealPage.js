import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {TextField, Button} from '@material-ui/core';
import moment from 'moment';

class AddDeal extends Component {
    state = {
        startTime: moment().format('YYYY-MM-DDTkk:mm'),
        endTime: '',
        description: '',
        redemptionsLimit: 0,
        imageFileSelected: null
    };

    // -----Handles all input data for deal except image data-------
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
      }
    
    // submits form and dispatches inputted form data to deals saga
    submitDeal = event => {
        event.preventDefault();

        this.props.dispatch({type: 'ADD_DEAL', 
            payload: {
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                description: this.state.description,
                redemptionsLimit: this.state.redemptionsLimit,
                imageFileSelected: this.state.imageFileSelected
            }
        });
    } // end submitDeal

    // ----Handles image upload data----------------
    fileUploadHandler = event => {
        this.setState({
            imageFileSelected: event.target.files[0]
        });
    }
    

    render() {
        
        // current date and time down to seconds converted to just minutes
        const convertedDateTime = moment().format('YYYY-MM-DDTkk:mm');  
        return (
            <div>
                <h2>Add Deals</h2>
                <form onSubmit={this.submitDeal}>
                    <h3>Add Deal</h3>
                    <TextField
                        id="datetime-local"
                        label="Start Time For Deal"
                        type="datetime-local"
                        onChange={this.handleInputChangeFor('startTime')}
                        defaultValue={convertedDateTime}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                    <TextField
                        id="datetime-local"
                        label="End Time For Deal"
                        type="datetime-local"
                        onChange={this.handleInputChangeFor('endTime')}
                        defaultValue={convertedDateTime}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField 
                        placeholder="Deal Description"
                        label="Deal Description"
                        onChange={this.handleInputChangeFor('description')}
                    />
                    <div>
                    <TextField
                        label="Redemptions Limit"
                        type="number"
                        onChange={this.handleInputChangeFor('redemptionsLimit')}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        margin="normal"
                    />
                    </div>
                    <TextField 
                        label="Upload Your Deal Image!"
                        type="file"
                        onChange={this.fileSelectedHandler}
                    />
                    <div>
                    <input
                        type="submit"
                        name="submit"
                        value="Add Deal"
                    />
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AddDeal);