import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core/';
import moment from 'moment';

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
        
        // in case business has never set a deal before
        if (this.props.store.deals.length === 0) {
            return (<h2>No Deals Happening Near You At This Time</h2>)
        }

        // Maps over array of objects consisting of all active deals
        const allDeals = this.props.store.deals.map((dealCard, index) => {
            
            // If business set redemptions limit to 0 show that Redemptions
            // available is unlimited on deal card
            if (dealCard.redemptions_limit === 0) {
                dealCard.redemptions_limit = 'Unlimited';
            }

            return (
                // this will be the deal cards and eventually be made their own component
                <div className="dealCard" key={index}>
                    <h2>{dealCard.description}</h2>
                    <h3>{dealCard.business_name}</h3>
                    <h4>{dealCard.address}</h4>
                    <p>Started {moment(dealCard.start_time).calendar()}</p>
                    <p>ends {moment(dealCard.end_time).fromNow()}</p>
                    <p>{moment(dealCard.start_time).format('LTS')} TO {moment(dealCard.end_time).format('LTS')}</p>
                    <p>Redemptions Remaining: {dealCard.redemptions_limit}</p>
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
