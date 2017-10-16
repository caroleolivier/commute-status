import React, { Component } from 'react';

import styles from './styles.scss';

class RouteSelector extends Component {
    render() {
        return (
            <div className={styles.RouteSelector}>
                <div className={styles.LinkContainer}><a href="/#/fromHome"><span>From Home</span></a></div>
                <div className={styles.LinkContainer}><a href="/#/toHome"><span>To Home</span></a></div>
            </div>
        );
    }
}

export default RouteSelector;
