import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class TubeStationHeader extends Component {
    render() {
        return (
            <div className="horizontalContainer">
                <i className={`fa fa-subway ${styles.tubeIcon}`} />
                <h3>{this.props.stationName} towards {this.props.direction}</h3>
            </div>
        );
    }
}
TubeStationHeader.propTypes = {
    stationName: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired
};

export default TubeStationHeader;
