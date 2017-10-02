/* eslint-env browser */

import 'whatwg-fetch';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BusStationHeader from './BusStationHeader';
import BusArrivalTable from './BusArrivalTable';

import { buildUrl, parseBusArrival } from './services/TfLBusDataAPIHelper';

class BusStationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busesExpectedTimes: []
        };
    }

    componentDidMount() {
        const url = buildUrl(this.props.busStation.stationId,
            this.props.busStation.directionId, this.props.busStation.buses);
        fetch(url)
            .then(response => response.json())
            .then((json) => {
                const busArrivalTimes = parseBusArrival(json);
                /* lot of discussions around whether setState should be called here or not :s */
                /* eslint-disable react/no-did-mount-set-state */
                this.setState({
                    busesExpectedTimes: busArrivalTimes
                });
                /* eslint-enable react/no-did-mount-set-state */
            })
            .catch((ex) => {
                console.log('parsing failed', ex);
            });
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
        directionId: PropTypes.string,
        buses: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
};

export default BusStationContainer;
