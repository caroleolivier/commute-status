import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TubeArrivalRow extends Component {
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

TubeArrivalRow.propTypes = {
    lineName: PropTypes.string.isRequired,
    expectedSeconds: PropTypes.number.isRequired
};

export default TubeArrivalRow;
