import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TubeStationContainer from './TubeStationContainer';

class TubeStations extends Component {
    render() {
        const stations = this.props.tubeStations.map(
            station => <TubeStationContainer key={station.stationId} tubeStation={station} />
        );
        return (
            <div>
                <h3>Tube(s)</h3>
                {stations}
            </div>
        );
    }
}

TubeStations.propTypes = {
    tubeStations: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TubeStations;
