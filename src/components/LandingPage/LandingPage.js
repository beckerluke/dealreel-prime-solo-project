import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core/';
import moment from 'moment';

import './LandingPage.css';
import DistanceFilter from './DistanceFilter/DistanceFilter';
import DealsList from './DealsList/DealsList';

// Max Proximity That User Will Be Able to View Deals From (in meters)
// const FARTHEST_DIST = 32186.9;

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

        // // filters all active deals by distance away from user
        // const closestDeals = this.props.store.deals.filter((deal, index) => {
        //     return deal.distance.value <= FARTHEST_DIST
        // });

        // // maps through the array of filtered deal objects
        // const allDeals = closestDeals.map((dealCard, index) => {

        //     if(dealCard.redemptions_limit === 0) {
        //         dealCard.redemptions_limit = 'Unlimited';
        //     }
        //     // converts distance from meters to miles
        //     const dealDistance = Math.round(dealCard.distance.value/1609.344);
        
        //     return (
        //         // this is the deal card displayed in deals feed
        //         <div className="dealCard" key={index}>
        //             <h2>{dealCard.description}</h2>
        //             <h3>{dealCard.business_name}</h3>
        //             <h4>{dealCard.address}</h4>
        //             <p>ends {moment(dealCard.end_time).fromNow()}</p>
        //             <p>From {moment(dealCard.start_time).format('LTS')} to {moment(dealCard.end_time).format('LTS')}</p>
        //             <p>Redemptions Remaining: {dealCard.redemptions_limit}</p>
        //             <p>{dealDistance} miles away</p>
        //         </div>
        //     )

        // });
        
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
                        {/* {allDeals} */}
                        <DistanceFilter />
                        <DealsList />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(LandingPage);
