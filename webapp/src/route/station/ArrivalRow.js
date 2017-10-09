import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ArrivalRow extends Component {
    render() {
        const expectedInMins = Math.round(this.props.expectedSeconds / 60);
        return (
            <tr>
                <td>{this.props.lineName}</td>
                <td>{expectedInMins} min(s)</td>
            </tr>
        );
    }
}

ArrivalRow.propTypes = {
    lineName: PropTypes.string.isRequired,
    expectedSeconds: PropTypes.number.isRequired
};

export default ArrivalRow;
