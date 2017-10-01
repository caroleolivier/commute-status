import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BusStationContainer from './BusStationContainer';

class BusStations extends Component {
    render() {
        const busStations = [];
        for (let i = 0; i < this.props.busStations.length; i += 1) {
            const busStation = this.props.busStations[i];
            busStations.push(
                <BusStationContainer busStation={busStation} />
            );
        }
        return (
            <div>
                <h3>Direction: {this.props.direction}</h3>
                {busStations}
            </div>
        );
    }
}

BusStations.propTypes = {
    direction: PropTypes.string.isRequired,
    busStations: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BusStations;
