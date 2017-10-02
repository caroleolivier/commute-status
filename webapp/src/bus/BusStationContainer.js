import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BusStationHeader from './BusStationHeader';
import BusArrivalTable from './BusArrivalTable';

import BusArrivalProvider from './services/BusArrivalProvider';

class BusStationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busesExpectedTimes: []
        };
    }

    componentDidMount() {
        const provider = new BusArrivalProvider();
        /* lot of discussions around whether setState should be called here or not :s */
        /* eslint-disable react/no-did-mount-set-state */
        this.setState({
            busesExpectedTimes: provider.getBusArrivals(
                this.props.busStation.stationId, this.props.busStation.buses)
        });
        /* eslint-enable react/no-did-mount-set-state */
    }

    render() {
        return (
            <div>
                <BusStationHeader
                    stationName={this.props.busStation.stationName}
                    direction={this.props.busStation.direction}
                />
                <BusArrivalTable arrivals={this.state.busesExpectedTimes} />
            </div>
        );
    }
}

BusStationContainer.propTypes = {
    busStation: PropTypes.shape({
        stationName: PropTypes.string,
        stationId: PropTypes.string,
        direction: PropTypes.string,
        buses: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
};

export default BusStationContainer;
