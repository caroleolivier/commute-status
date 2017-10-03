import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BusStationContainer from './BusStationContainer';

class BusStations extends Component {
    render() {
        const busStations = [];
        for (let i = 0; i < this.props.busStations.length; i += 1) {
            const busStation = this.props.busStations[i];
            const key = busStation.stationId;
            busStations.push(
                <BusStationContainer key={key} busStation={busStation} />
            );
        }
        return (
            <div>
                <h3>Buse(s)</h3>
                {busStations}
            </div>
        );
    }
}

BusStations.propTypes = {
    busStations: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BusStations;
