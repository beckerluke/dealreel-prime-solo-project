import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import DealCard from '../DealCard/DealCard';


class DealsList extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {

        // maps through the array of filtered deal objects
        const allDeals = this.props.closestDeals.map((dealCard, index) => {
            return (<DealCard key={index} dealCard={dealCard}/>)
        });

        return (
            <div>
                {allDeals}
            </div>
        );
    }
}

export default connect(mapStoreToProps)(DealsList);