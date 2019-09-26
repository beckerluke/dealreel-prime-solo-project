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

        const allDeals = this.props.store.deals.map((dealCard, index) => {
            // if (dealCard.end_time.isAfter(moment().format())) {
            return (
                // this will be the deal cards and eventually be made their own component
                <div className="dealCard" key={index}>
                    <h2>{dealCard.business_name}</h2>
                    <h3>{dealCard.description}</h3>
                    <p>{moment(dealCard.start_time).calendar()}</p>
                    <p>{moment(dealCard.start_time).fromNow()}</p>
                    <p>{moment(dealCard.start_time).format('LTS')} TO {moment(dealCard.end_time).format('LTS')}</p>
                    <p>{dealCard.location}</p>
                </div>
            )
            // }
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
