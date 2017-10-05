import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BusArrivalRow extends Component {
    render() {
        const expectedInMins = Math.round(this.props.expectedSeconds / 60);
        return (
            <tr>
                <td>{this.props.busNo}</td>
                <td>{this.props.destination}</td>
                <td>{expectedInMins} min(s)</td>
            </tr>
        );
    }
}

BusArrivalRow.propTypes = {
    busNo: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    expectedSeconds: PropTypes.number.isRequired
};

export default BusArrivalRow;
