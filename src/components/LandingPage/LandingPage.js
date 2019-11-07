import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core/';
import moment from 'moment';

import './LandingPage.css';
import DistanceFilter from './DistanceFilter/DistanceFilter';

class LandingPage extends Component {
    state = {
        heading: 'ACTIVE DEALS NEAR YOU',
    };
    
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_ALL_DEALS'});
    }

    onLogin = (event) => {
        this.props.history.push('/login');
    }

    render() {
        if (this.props.store.deals.length === 0) {
            return (
                <div>
                    <h2>No Deals Happening Near You At This Time</h2>
                    <h3>Already a Member?</h3>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.onLogin}
                    >
                        Go To Your Deals
                    </Button>
                    <DistanceFilter  />
                </div>
            )
        }

        return (
            <div className="container">
                <h2>{this.state.heading}</h2>
                <h3>{moment().format('LLLL')}</h3>
                <div className="grid-col grid-col_4">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.onLogin}
                        >
                            Go To Your Deals
                        </Button>
                    </div>
                <div className="grid">
                    <div className="grid-col grid-col_8">
                        <DistanceFilter />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(LandingPage);
