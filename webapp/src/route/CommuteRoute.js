import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BusStationContainer from '../bus/BusStationContainer';
import TubeStationContainer from '../tube/TubeStationContainer';

const CommuteRouteStopType = {
    BUS: {
        getComponent: stopConfig => <BusStationContainer config={stopConfig} />
    },
    TUBE: {
        getComponent: stopConfig => <TubeStationContainer config={stopConfig} />
    }
};

class CommuteRoute extends Component {
    render() {
        const stops = this.props.stops.map(stopConfig =>
            CommuteRouteStopType[stopConfig.type.toUpperCase()].getComponent(stopConfig));
        return (
            <div>
                <h2>{this.props.routeName}</h2>
                {stops}
            </div>
        );
    }
}

CommuteRoute.propTypes = {
    routeName: PropTypes.string.isRequired,
    stops: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommuteRoute;
