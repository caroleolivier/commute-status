import React, { Component } from 'react';

import BusArrivalHeader from './BusArrivalHeader';
import BusArrivalTable from './BusArrivalTable';

class BusArrivalWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            direction: 'Earlsfield',
            busesExpectedTimes: [
                { busNumber: '77', expectedInSec: 90 },
                { busNumber: '44', expectedInSec: 100 },
                { busNumber: '270', expectedInSec: 130 }
            ]
        };
    }

    render() {
        return (
            <div>
                <BusArrivalHeader direction={this.state.direction} />
                <BusArrivalTable arrivals={this.state.busesExpectedTimes} />
            </div>
        );
    }
}

export default BusArrivalWrapper;
