import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BusArrivalRow from './BusArrivalRow';

class BusArrivalTable extends Component {
    render() {
        const rows = [];
        for (let i = 0; i < this.props.arrivals.length; i += 1) {
            const busArrival = this.props.arrivals[i];
            rows.push(
                <BusArrivalRow
                    key={busArrival.busNumber + busArrival.expectedInSec}
                    busNumber={busArrival.busNumber}
                    expectedIn={busArrival.expectedInSec}
                />
            );
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th>Bus</th>
                        <th>Expected</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

BusArrivalTable.propTypes = {
    arrivals: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BusArrivalTable;
