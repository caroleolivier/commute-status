import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TubeStationHeader extends Component {
    render() {
        return (
            <h3>Tube Station {this.props.stationName} towards {this.props.direction}</h3>
        );
    }
}
TubeStationHeader.propTypes = {
    stationName: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired
};

export default TubeStationHeader;
