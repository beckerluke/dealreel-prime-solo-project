import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import moment from 'moment';

class AdminDealsPage extends Component {
    state = {
        heading: 'Your Deals',
    };

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_ADMIN_DEALS'});
    }

    
    render() {
        let allAdminDeals = this.props.store.deals;
        if (allAdminDeals.length === 0) {
            return (<h2>You don't have any deals</h2>)
        } 
        allAdminDeals = this.props.store.deals.map((dealCard, index) => {
            return (
                // this will be the deal cards and eventually be made their own component
                <div className="dealCard" key={index}>
                    <h2>{dealCard.business_name}</h2>
                    <h3>{dealCard.description}</h3>
                    <p>{moment(dealCard.end_time).fromNow()}</p>
                    <p>{moment(dealCard.start_time).format('MMM Do YYYY, h:mm:ss a')}</p>
                    <p>{moment(dealCard.end_time).format('MMM Do YYYY, h:mm:ss a')}</p>
                    <p>{dealCard.location}</p>
                </div>
            )
        }) 
        ;

        return (
            <div className="container">
                <h2>{this.state.heading}</h2>

                <div className="grid">
                    <div className="grid-col grid-col_8">
                        {allAdminDeals}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AdminDealsPage);