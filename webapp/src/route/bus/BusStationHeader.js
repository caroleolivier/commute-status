import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class BusStationHeader extends Component {
    render() {
        return (
            <div>
                <i className={`fa fa-bus ${styles.busIcon}`} />
                <h3>{this.props.stationName} (towards {this.props.direction})</h3>
            </div>
        );
    }
}
BusStationHeader.propTypes = {
    stationName: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired
};

export default BusStationHeader;
