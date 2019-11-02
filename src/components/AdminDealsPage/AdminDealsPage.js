import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
// import moment from 'moment-timezone';
import moment from 'moment';

class AdminDealsPage extends Component {
    state = {
        heading: 'Your Deals',
    };

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_ADMIN_DEALS'});
    }

    
    render() {

        // list of all deals a business has ever set
        let allAdminDeals = this.props.store.adminDeals;
        if (allAdminDeals.length === 0) {
            return (<h2>You haven't set any deals</h2>)
        } 

        const allAdminDealsList = allAdminDeals.map((dealCard, index) => {
            return (
                
                // this will be the deal cards and eventually be made their own component
                <div className="dealCard" key={index}>
                    <h2>{dealCard.description}</h2>
                    <p>Set: {moment(dealCard.start_time).fromNow()}</p>
                    <p>{moment(dealCard.start_time).format('MMM Do YYYY, h:mm:ss a')}</p>
                    <p>{moment(dealCard.end_time).format('MMM Do YYYY, h:mm:ss a')}</p>
                    <p>Redemptions Limit: {dealCard.redemptions_limit}</p>
                </div>
            )
        }) 
        ;

        return (
            <div className="container">
                <h2>{this.state.heading}</h2>

                <div className="grid">
                    <div className="grid-col grid-col_8">
                        {allAdminDealsList}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AdminDealsPage);