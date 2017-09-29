import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BusArrivalRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.busNumber}</td>
                <td>{this.props.expectedIn} secs</td>
            </tr>
        );
    }
}

BusArrivalRow.propTypes = {
    busNumber: PropTypes.string.isRequired,
    expectedIn: PropTypes.number.isRequired
};

export default BusArrivalRow;
