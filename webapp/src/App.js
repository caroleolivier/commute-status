import React, { Component } from 'react';
import config from './config/config';

import CommuteRoute from './route/CommuteRoute';

class App extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            direction: 'fromHome'
        };
    }

    render() {
        const routes = config[this.state.direction];
        const routesComponents = routes.map(route => <CommuteRoute routeName={route.routeName} stops={route.stops} />);
        return (
            <div>
                {routesComponents}
            </div>
        );
    }
}

export default App;
