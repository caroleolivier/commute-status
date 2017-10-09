import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const StationHeaderClasses = {
    bus: {
        getClass: () => `fa fa-bus ${styles.busIcon} ${styles.icon}`
    },
    tube: {
        getClass: () => `fa fa-subway ${styles.tubeIcon} ${styles.icon}`
    },
    train: {
        getClass: () => `fa fa-train ${styles.trainIcon} ${styles.icon}`
    }
};

class StationHeader extends Component {
    render() {
        return (
            <div className={`horizontalContainer ${styles.header}`}>
                <i className={StationHeaderClasses[this.props.type].getClass()} />
                <h3>{this.props.name}</h3>
            </div>
        );
    }
}
StationHeader.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export default StationHeader;
