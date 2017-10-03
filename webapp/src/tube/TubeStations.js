import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TubeStationContainer from './TubeStationContainer';

class TubeStations extends Component {
    render() {
        const stations = [];
        for (let i = 0; i < this.props.tubeStations.length; i += 1) {
            const tubeStation = this.props.tubeStations[i];
            const key = tubeStation.stationId;
            stations.push(
                <TubeStationContainer key={key} tubeStation={tubeStation} />
            );
        }
        return (
            <div>
                <h3>Tube(s)</h3>
                {stations}
            </div>
        );
    }
}

TubeStations.propTypes = {
    direction: PropTypes.string.isRequired,
    tubeStations: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TubeStations;
