import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StationContainer from './station/StationContainer';

import styles from './styles.scss';


class CommuteRoute extends Component {
    render() {
        return (
            <div className={styles.commuteRoute}>
                <h2>{this.props.routeName}</h2>
                <div className="horizontalContainer">
                    {this.props.stops.map(stopConfig => <StationContainer key={stopConfig.stationId} config={stopConfig} />)}
                </div>
            </div>
        );
    }
}

CommuteRoute.propTypes = {
    routeName: PropTypes.string.isRequired,
    stops: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommuteRoute;
