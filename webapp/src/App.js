import React, { Component } from 'react';
import config from './config/direction';

import BusStations from './bus/BusStations';

class App extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            direction: 'fromHome'
        };
    }

    render() {
        const directionConfig = config[this.state.direction];
        return (
            <BusStations
                direction={this.state.direction}
                busStations={directionConfig.busStations}
            />
        );
    }
}

export default App;
