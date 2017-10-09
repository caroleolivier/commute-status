import 'whatwg-fetch';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BusStationHeader from './BusStationHeader';
import BusArrivalTimeTable from './BusArrivalTimeTable';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import TfLDataAPIService from '../../services/TfLDataAPIService';

import styles from './styles.scss';

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
        const service = new TfLDataAPIService();
        service.fetchArrivals(this.props.config.stationId,
            this.props.config.directionId, this.props.config.lines)
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
            <div className={styles.container}>
                <BusStationHeader
                    stationName={this.props.config.stationName}
                    direction={this.props.config.direction}
                />
                {this.state.state.getComponent(this)}
            </div>
        );
    }
}

BusStationContainer.propTypes = {
    config: PropTypes.shape({
        stationName: PropTypes.string,
        stationId: PropTypes.string,
        direction: PropTypes.string,
        directionId: PropTypes.string,
        lines: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
};

export default BusStationContainer;

export { BusStationContainerState };
