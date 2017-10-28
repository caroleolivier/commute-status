import 'whatwg-fetch';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StationHeader from './StationHeader';
import ArrivalTimeTable from './ArrivalTimeTable';
import Loading from '../../common/Loading';
import ErrorMessage from '../../common/ErrorMessage';
import TfLDataAPIService from '../../services/TfLDataAPIService';
import NationalRailAPIService from '../../services/NationalRailAPIService';

import styles from './styles.scss';

const services = {
    tube: {
        get: () => new TfLDataAPIService()
    },
    bus: {
        get: () => new TfLDataAPIService()
    },
    train: {
        get: () => new NationalRailAPIService()
    }
};

const StationContainerState = {
    LOADING: {
        id: 0,
        getComponent: () => <Loading />
    },
    ERROR: {
        id: 1,
        getComponent: () => <ErrorMessage message="Unable to load data" />
    },
    LOADED: {
        id: 2,
        getComponent: container => <ArrivalTimeTable arrivals={container.state.expectedTimes} />
    }
};

class StationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: StationContainerState.LOADING,
            expectedTimes: []
        };
    }

    componentDidMount() {
        const service = services[this.props.config.type].get();
        service.fetchArrivals(this.props.config)
            .then((arrivalTimes) => {
                /* lot of discussions around whether setState should be called here or not :s */
                /* eslint-disable react/no-did-mount-set-state */
                this.setState({
                    expectedTimes: arrivalTimes.slice(0, 4),
                    state: StationContainerState.LOADED
                });
                /* eslint-enable react/no-did-mount-set-state */
            })
            .catch((ex) => {
                console.log(ex);
                this.setState({
                    state: StationContainerState.ERROR
                });
            });
    }

    render() {
        return (
            <div className={styles.container}>
                <StationHeader
                    name={this.props.config.stationName}
                    type={this.props.config.type}
                />
                {this.state.state.getComponent(this)}
            </div>
        );
    }
}

StationContainer.propTypes = {
    config: PropTypes.shape({
        type: PropTypes.string,
        stationName: PropTypes.string,
        stationId: PropTypes.string,
        direction: PropTypes.string,
        directionId: PropTypes.string,
        lines: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
};

export default StationContainer;

export { StationContainerState };
