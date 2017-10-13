import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from '../config/config';

import styles from './App.scss';

import ErrorMessage from '../common/ErrorMessage';
import RouteDirectionSelector from '../routeSelector/RouteSelector';
import Header from '../route/Header';
import CommuteRoute from '../route/CommuteRoute';

class App extends Component {
    render() {
        let content;
        if (this.props.urlArg in config) {
            const direction = this.props.urlArg;
            const routes = config[this.props.urlArg];
            const routesComponents = routes.map(route =>
                <CommuteRoute key={route.routeName} routeName={route.routeName} stops={route.stops} />);
            content = (
                <div className={styles.App}>
                    <Header direction={direction} />
                    <div>
                        {routesComponents}
                    </div>
                </div>
            );
        } else if (this.props.urlArg === '') {
            content = <RouteDirectionSelector />;
        } else {
            content = (
                <div className={styles.ErrorMessage}>
                    <ErrorMessage className={styles.ErrorMessage} message="Unknown URL" />
                </div>
            );
        }

        return (
            <div className={styles.App}>
                {content}
            </div>
        );
    }
}

App.propTypes = {
    urlArg: PropTypes.string
};
App.defaultProps = {
    urlArg: ''
};

export default App;
