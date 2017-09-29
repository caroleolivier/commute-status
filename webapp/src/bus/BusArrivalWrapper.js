import React, { Component } from 'react';

import BusArrivalHeader from './BusArrivalHeader';
import BusArrivalTable from './BusArrivalTable';

import BusArrivalProvider from './services/BusArrivalProvider';

class BusArrivalWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            direction: 'Earlsfield',
            busesExpectedTimes: []
        };
    }

    componentDidMount() {
        const provider = new BusArrivalProvider();
        /* lot of discussions around whether setState should be called here or not :s */
        /* eslint-disable react/no-did-mount-set-state */
        this.setState({
            busesExpectedTimes: provider.getBusArrivals(this.direction)
        });
        /* eslint-enable react/no-did-mount-set-state */
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
