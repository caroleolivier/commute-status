import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BusStationContainer from './bus/BusStationContainer';
import TubeStationContainer from './tube/TubeStationContainer';

const CommuteRouteStopType = {
    BUS: {
        getComponent: stopConfig => ({
            key: `bus${stopConfig.stationId}`,
            component: <BusStationContainer config={stopConfig} />
        })
    },
    TUBE: {
        getComponent: stopConfig => ({
            key: `tube${stopConfig.stationId}`,
            component: <TubeStationContainer config={stopConfig} />
        })
    }
};

class CommuteRoute extends Component {
    render() {
        const stops = this.props.stops.map(stopConfig =>
            CommuteRouteStopType[stopConfig.type.toUpperCase()].getComponent(stopConfig));
        return (
            <div>
                <h2>{this.props.routeName}</h2>
                <div className="horizontalContainer">
                    {stops.map(stop => <div key={stop.key}>{stop.component}</div>)}
                </div>
            </div>
        );
    }
}

CommuteRoute.propTypes = {
    routeName: PropTypes.string.isRequired,
    stops: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommuteRoute;
