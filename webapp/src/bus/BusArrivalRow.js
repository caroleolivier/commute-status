import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BusArrivalRow extends Component {
    render() {
        const expectedInMins = Math.round(this.props.expectedIn / 60);
        return (
            <tr>
                <td>{this.props.busNumber}</td>
                <td>{expectedInMins} min(s)</td>
            </tr>
        );
    }
}

BusArrivalRow.propTypes = {
    busNumber: PropTypes.string.isRequired,
    expectedIn: PropTypes.number.isRequired
};

export default BusArrivalRow;
