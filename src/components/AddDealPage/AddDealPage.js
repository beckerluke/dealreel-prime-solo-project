import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {TextField} from '@material-ui/core';
import moment from 'moment';

class AddDeal extends Component {
    state = {
        start_time: '',
        end_time: '',
        description: '',
        location: '',
        redemptionsLimit: 0,
        image: ''
    };

    render() {
        // current date and time down to seconds converted to just minutes
        const convertedDateTime = moment().format('YYYY-MM-DDTkk:mm');  
        return (
            <div>
                <form>
                    <h2>Add Deal</h2>
                    <TextField
                        id="datetime-local"
                        label="Start Time For Deal"
                        type="datetime-local"
                        defaultValue={convertedDateTime}
                        // className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="datetime-local"
                        label="End Time For Deal"
                        type="datetime-local"
                        defaultValue={convertedDateTime}
                        // className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField placeholder="Deal Description" />
                </form>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AddDeal);