import React, { Component } from 'react';
import config from '../config/config';

import styles from './App.scss';

import Header from './Header';
import CommuteRoute from '../route/CommuteRoute';

class App extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            direction: 'fromHome'
        };
    }

    render() {
        const routes = config[this.state.direction];
        const routesComponents = routes.map(route =>
            <CommuteRoute key={route.routeName} routeName={route.routeName} stops={route.stops} />);
        return (
            <div className={styles.App}>
                <Header direction={this.state.direction} />
                {routesComponents}
            </div>
        );
    }
}

export default App;
