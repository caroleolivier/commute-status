import 'whatwg-fetch';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BusStationHeader from './BusStationHeader';
import BusArrivalTable from './BusArrivalTable';

import TfLBusDataAPIService from './services/TfLBusDataAPIService';

class BusStationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: 'loading',
            busesExpectedTimes: []
        };
    }

    componentDidMount() {
        const service = new TfLBusDataAPIService();
        service.fetch(this.props.busStation.stationId,
            this.props.busStation.directionId, this.props.busStation.buses)
            .then((busArrivalTimes) => {
                /* lot of discussions around whether setState should be called here or not :s */
                /* eslint-disable react/no-did-mount-set-state */
                this.setState({
                    busesExpectedTimes: busArrivalTimes,
                    state: 'loaded'
                });
                /* eslint-enable react/no-did-mount-set-state */
            })
            .catch((ex) => {
                console.log(ex);
                this.setState({
                    state: 'error'
                });
            });
    }

    render() {
        // todo: refactor switch statement
        switch (this.state.state) {
        case 'loading':
            return (
                <div>
                    <BusStationHeader
                        stationName={this.props.busStation.stationName}
                        direction={this.props.busStation.direction}
                    />
                    <p>Loading...</p>
                </div>
            );
        case 'loaded':
            return (
                <div>
                    <BusStationHeader
                        stationName={this.props.busStation.stationName}
                        direction={this.props.busStation.direction}
                    />
                    <BusArrivalTable arrivals={this.state.busesExpectedTimes} />
                </div>
            );
        case 'error':
        default:
            return (
                <div>
                    <BusStationHeader
                        stationName={this.props.busStation.stationName}
                        direction={this.props.busStation.direction}
                    />
                    <p>Error</p>
                </div>
            );
        }
    }
}

BusStationContainer.propTypes = {
    busStation: PropTypes.shape({
        stationName: PropTypes.string,
        stationId: PropTypes.string,
        direction: PropTypes.string,
        directionId: PropTypes.string,
        buses: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
};

export default BusStationContainer;
