import 'whatwg-fetch';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TubeStationHeader from './TubeStationHeader';
import TubeArrivalTimeTable from './TubeArrivalTimeTable';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import TfLBusDataAPIService from '../services/TfLDataAPIService';

const TubeStationContainerState = {
    LOADING: {
        id: 0,
        getComponent: () => <Loading />
    },
    ERROR: {
        id: 1,
        getComponent: () => <ErrorMessage message="Unable to load tube data" />
    },
    LOADED: {
        id: 2,
        getComponent: container => <TubeArrivalTimeTable arrivals={container.state.expectedTimes} />
    }
};

class TubeStationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: TubeStationContainerState.LOADING,
            expectedTimes: []
        };
    }

    componentDidMount() {
        const service = new TfLBusDataAPIService();
        service.fetchArrivals(this.props.config.stationId,
            this.props.config.directionId, this.props.config.lines)
            .then((busArrivalTimes) => {
                /* lot of discussions around whether setState should be called here or not :s */
                /* eslint-disable react/no-did-mount-set-state */
                this.setState({
                    expectedTimes: busArrivalTimes,
                    state: TubeStationContainerState.LOADED
                });
                /* eslint-enable react/no-did-mount-set-state */
            })
            .catch((ex) => {
                console.log(ex);
                this.setState({
                    state: TubeStationContainerState.ERROR
                });
            });
    }

    render() {
        return (
            <div>
                <TubeStationHeader
                    stationName={this.props.config.stationName}
                    direction={this.props.config.direction}
                />
                {this.state.state.getComponent(this)}
            </div>
        );
    }
}

TubeStationContainer.propTypes = {
    config: PropTypes.shape({
        stationName: PropTypes.string,
        stationId: PropTypes.string,
        direction: PropTypes.string,
        directionId: PropTypes.string,
        lines: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
};

export default TubeStationContainer;

export { TubeStationContainerState };
