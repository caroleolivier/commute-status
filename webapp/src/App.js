import React, { Component } from 'react';
import config from './config/config';

import BusStations from './bus/BusStations';
import TubeStations from './tube/TubeStations';

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
            <div>
                <BusStations
                    direction={this.state.direction}
                    busStations={directionConfig.busStations}
                />
                <TubeStations
                    direction={this.state.direction}
                    tubeStations={directionConfig.tubeStations}
                />
            </div>
        );
    }
}

export default App;
