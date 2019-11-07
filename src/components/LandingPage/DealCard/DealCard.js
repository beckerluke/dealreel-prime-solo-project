import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import moment from 'moment';


class DealCard extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {
        const dealCard = this.props.dealCard;
        
        if(dealCard.redemptions_limit === 0) {
            dealCard.redemptions_limit = 'Unlimited';
        }
    
        // converts distance from meters to miles
        const dealDistance = Math.round(dealCard.distance.value/1609.344);

        return (
            // this is the deal card displayed in deals feed
            <div className="dealCard" key={this.props.index}>
                <h2>{dealCard.description}</h2>
                <h3>{dealCard.business_name}</h3>
                <h4>{dealCard.address}</h4>
                <p>ends {moment(dealCard.end_time).fromNow()}</p>
                <p>From {moment(dealCard.start_time).format('LTS')} to {moment(dealCard.end_time).format('LTS')}</p>
                <p>Redemptions Remaining: {dealCard.redemptions_limit}</p>
                <p>{dealDistance} miles away</p>
            </div>
        )
        
    }
}

export default connect(mapStoreToProps)(DealCard);
