import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Header.scss';

class Header extends Component {
    render() {
        return (
            <div className={styles.header}>
                <h1 className={styles.title}>{this.props.direction}</h1>
            </div>
        );
    }
}

Header.propTypes = {
    direction: PropTypes.string.isRequired
};

export default Header;
