import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {TextField} from '@material-ui/core';
// import moment from 'moment-timezone';
import moment from 'moment';
import Swal from 'sweetalert2';

class AddDeal extends Component {
    state = {
        startTime: moment().format('YYYY-MM-DDTkk:mm'),
        endTime: '',
        description: '',
        redemptionsLimit: 0,
    };

    // -----Handles all input data for deal except image data-------
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        }, () => {
            console.log(this.state);
        });
      }
    
    // submits form and dispatches inputted form data to deals saga
    submitDeal = event => {
        event.preventDefault();

        // checks to make sure user enters correct start times and end times
        if (moment().isAfter(this.state.startTime) || 
            moment(this.state.endTime).isBefore(moment()) || 
            moment(this.state.startTime).isAfter(this.state.endTime)) {
            return (Swal.fire(
                'Error',
                'Invalid time selected',
                'error'
            ))
        }

        // checks to make sure user enters a description
        if (this.state.description === '') {
            return (Swal.fire(
                'Error',
                'Enter a description',
                'error'
            ))
        }

        Swal.fire(
            'Deal Set!',
            'Your deal will be activated and broadcasted at set time!',
            'success'
        )

        this.props.dispatch({type: 'ADD_DEAL', 
            payload: {
                startTime: moment.utc(this.state.startTime).format(),
                endTime: moment.utc(this.state.endTime).format(),
                description: this.state.description,
                redemptionsLimit: this.state.redemptionsLimit,
                imageFileSelected: this.state.imageFileSelected
            }
        });

    } // end submitDeal    

    render() {

        // current date and time down to seconds converted to just minutes
        const convertedDateTime = moment().format('YYYY-MM-DDTkk:mm');  
        return (
            <div>
                <h2 className="secondary-header">Add Deal</h2>
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
                        placeholder="Brief description of deal"
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