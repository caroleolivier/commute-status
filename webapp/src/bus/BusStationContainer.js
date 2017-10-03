import 'whatwg-fetch';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BusStationHeader from './BusStationHeader';
import BusArrivalTimeTable from './BusArrivalTimeTable';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import TfLBusDataAPIService from './services/TfLBusDataAPIService';

const BusStationContainerState = {
    LOADING: {
        id: 0,
        getComponent: () => <Loading />
    },
    ERROR: {
        id: 1,
        getComponent: () => <ErrorMessage message="Unable to load bus data" />
    },
    LOADED: {
        id: 2,
        getComponent: container => <BusArrivalTimeTable arrivals={container.state.busesExpectedTimes} />
    }
};

class BusStationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: BusStationContainerState.LOADING,
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
                    state: BusStationContainerState.LOADED
                });
                /* eslint-enable react/no-did-mount-set-state */
            })
            .catch((ex) => {
                console.log(ex);
                this.setState({
                    state: BusStationContainerState.ERROR
                });
            });
    }

    render() {
        return (
            <div>
                <BusStationHeader
                    stationName={this.props.busStation.stationName}
                    direction={this.props.busStation.direction}
                />
                {this.state.state.getComponent(this)}
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

export { BusStationContainerState };
