import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TubeArrivalRow extends Component {
    render() {
        const expectedInMins = Math.round(this.props.expectedSeconds / 60);
        return (
            <tr>
                <td>{expectedInMins} min(s)</td>
            </tr>
        );
    }
}

TubeArrivalRow.propTypes = {
    expectedSeconds: PropTypes.number.isRequired
};

export default TubeArrivalRow;
