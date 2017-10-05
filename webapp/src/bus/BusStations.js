import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BusStationContainer from './BusStationContainer';

class BusStations extends Component {
    render() {
        const busStations = this.props.busStations.map(
            busStation => <BusStationContainer key={busStation.stationId} busStation={busStation} />
        );
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
