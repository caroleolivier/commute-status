/* eslint-env browser */
/* eslint-disable class-methods-use-this */

import BusArrivalTime from './BusArrivalTime';

class TfLBusDataAPIService {
    fetch(stationId, directionId, buses) {
        const url = this._buildUrl(stationId, directionId, buses);
        return fetch(url)
            .then(resp => resp.json())
            .then(json => this._parseBusArrival(json));
    }

    _buildUrl(stationId, directionId, buses) {
        const busesStr = buses.join('%2C', buses);
        return `https://api.tfl.gov.uk/Line/${busesStr}/Arrivals/${stationId}?direction=${directionId}`;
    }

    _parseBusArrival(json) {
        return json.map((busArrival) => {
            const busName = busArrival.lineName;
            const expectedIn = busArrival.timeToStation;
            return new BusArrivalTime(busName, expectedIn);
        }).sort((a, b) => a.expectedSeconds - b.expectedSeconds);
    }
}
/* eslint-enable class-methods-use-this */

export default TfLBusDataAPIService;
