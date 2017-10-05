import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BusStationHeader extends Component {
    render() {
        return (
            <h3>Station {this.props.stationName} towards {this.props.direction}</h3>
        );
    }
}
BusStationHeader.propTypes = {
    stationName: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired
};

export default BusStationHeader;
