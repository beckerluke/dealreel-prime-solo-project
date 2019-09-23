import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {TextField} from '@material-ui/core';

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
        return (
            <div>
                <form>
                    <h2>Add Deal</h2>
                    <TextField placeholder="Deal Description" />
                </form>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AddDeal);