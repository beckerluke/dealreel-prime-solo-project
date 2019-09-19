import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core/'

import './LandingPage.css';

class LandingPage extends Component {
    state = {
        heading: 'ALL DEALS HAPPENING AROUND YOU',
    };
    
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_ALL_DEALS'});
    }

    onLogin = (event) => {
        this.props.history.push('/login');
    }

    render() {
        const allDeals = this.props.store.deals.map((dealCard, index) => {
            return (
                <div key={index}>
                    <h2>{dealCard.business_name}</h2>
                    <h3>{dealCard.description}</h3>
                    <p>{dealCard.start_time}</p>
                    <p>{dealCard.end_time}</p>
                    <p>{dealCard.location}</p>
                </div>
            )
        });
        
        return (
            <div className="container">
                <h2>{this.state.heading}</h2>

                <div className="grid">
                    <div className="grid-col grid-col_8">
                        {allDeals}
                    </div>
                    <div className="grid-col grid-col_4">
                        <h3>Already a Member?</h3>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.onLogin}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(LandingPage);
