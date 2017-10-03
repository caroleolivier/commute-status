import React, { Component } from 'react';
import busConfig from './config/bus';

import BusStations from './bus/BusStations';

class App extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            direction: 'fromHome'
        };
    }

    render() {
        const directionConfig = busConfig[this.state.direction];
        return (
            <BusStations
                direction={this.state.direction}
                busStations={directionConfig.busStations}
            />
        );
    }
}

export default App;
