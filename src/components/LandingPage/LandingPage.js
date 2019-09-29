import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core/';
import moment from 'moment';

import './LandingPage.css';

// Max Proximity That User Will Be Able to View Deals From
const FARTHEST_DIST = 35200;

class LandingPage extends Component {
    state = {
        heading: 'DEALS NEAR YOU',
    };
    
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_ALL_DEALS'});
    }

    onLogin = (event) => {
        this.props.history.push('/login');
    }

    render() {
        console.log(this.props.store.deals);
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
                        Login
                    </Button>
                </div>
            )
        }

        // filters all active deals by distance away from user
        const closestDeals = this.props.store.deals.filter((deal, index) => {
            return deal.distance.value <= FARTHEST_DIST
        });

        const allDeals = closestDeals.map((dealCard, index) => {
        
            return (
                // this is the deal card displayed in deals feed
                <div className="dealCard" key={index}>
                    <h2>{dealCard.business_name}</h2>
                    <h3>{dealCard.description}</h3>
                    <p>Started {moment(dealCard.start_time).calendar()}</p>
                    <p>ends {moment(dealCard.end_time).fromNow()}</p>
                    <p>{moment(dealCard.start_time).format('LTS')} TO {moment(dealCard.end_time).format('LTS')}</p>
                    <p>{dealCard.location}</p>
                </div>
            )

        });
        
        return (
            <div className="container">
                <h2>{this.state.heading}</h2>
                <h3>{moment().format('LLLL')}</h3>
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
