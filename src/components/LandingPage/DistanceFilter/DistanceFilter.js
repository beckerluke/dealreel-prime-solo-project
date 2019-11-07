import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import {Select, MenuItem, FormControl, Menu} from '@material-ui/core';
import DealsList from '../DealsList/DealsList';

class DistanceFilter extends Component {
    state = {
        FARTHEST_DIST: 32186.9,
        filteredDeals: [],
    };

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_ALL_DEALS'});
        this.filterDeals();
    }

    handleChangeDistance(event, dataKey) {
        this.setState({
            [dataKey]: parseInt(event.target.value)
        }, () => {
            this.props.dispatch({type: 'FETCH_ALL_DEALS'});
            this.filterDeals();
        })
        
    }

    filterDeals() {
        
        // filters all active deals by distance away from user
        const closestDeals = this.props.store.deals.filter((deal, index) => {
            return deal.distance.value <= this.state.FARTHEST_DIST
        });

        this.setState({
            filteredDeals: closestDeals,
        }, () => {
            console.log(this.state);
        })
        
    }

    render() {

        return (
            <div>
                <FormControl>
                    <div>
                        <Select
                            className="iconDropdown"
                            onChange={event => this.handleChangeDistance(event, "FARTHEST_DIST")}
                            value={this.state.FARTHEST_DIST}
                            inputProps={{
                            name: "status",
                            id: "status-select"
                            }}
                        > Filter Deal Distance
                            <MenuItem value={32186.9}> 20 miles
                            </MenuItem>
                            <MenuItem value={16093.4}> 10 miles
                            </MenuItem>
                            <MenuItem value={8046.72}> 5 miles 
                            </MenuItem>
                        </Select>
                    </div>
                </FormControl>
                <DealsList filteredDeals={this.state.filteredDeals}/>
                
            </div>
        );
    }
}

export default connect(mapStoreToProps)(DistanceFilter);
