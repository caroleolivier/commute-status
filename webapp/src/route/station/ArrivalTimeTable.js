import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArrivalRow from './ArrivalRow';

import styles from './styles.scss';

class ArrivalTimeTable extends Component {
    render() {
        const rows = [];
        const sortedArrivals = this.props.arrivals.sort((a, b) => (a.expectedSeconds > b.expectedSeconds ? 1 : -1));
        for (let i = 0; i < sortedArrivals.length; i += 1) {
            const arrival = this.props.arrivals[i];
            const key = `${arrival.expectedSeconds}${arrival.lineName}`;
            rows.push(
                <ArrivalRow
                    key={key}
                    lineName={arrival.lineName}
                    expectedSeconds={arrival.expectedSeconds}
                />
            );
        }

        return (
            <table className={styles.arrivalTable}>
                <thead>
                    <tr>
                        <th className={styles.lineHeader} />
                        <th className={styles.arrivalTimeHeader} />
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

ArrivalTimeTable.propTypes = {
    arrivals: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ArrivalTimeTable;
