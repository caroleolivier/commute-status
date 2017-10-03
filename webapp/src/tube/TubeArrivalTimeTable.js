import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TubeArrivalRow from './TubeArrivalRow';

class TubeArrivalTimeTable extends Component {
    render() {
        const rows = [];
        for (let i = 0; i < this.props.arrivals.length; i += 1) {
            const arrival = this.props.arrivals[i];
            rows.push(
                <TubeArrivalRow
                    key={arrival.expectedSeconds}
                    busNo={arrival.busNo}
                    expectedSeconds={arrival.expectedSeconds}
                />
            );
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th>Expected</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

TubeArrivalTimeTable.propTypes = {
    arrivals: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TubeArrivalTimeTable;
