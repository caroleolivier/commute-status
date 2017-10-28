/* eslint-env browser */
/* eslint-disable class-methods-use-this */

import ArrivalTime from './ArrivalTime';

class TfLDataAPIService {
    fetchArrivals(input) {
        const url = this._buildUrl(input.stationId, input.directionId, input.lines);
        return fetch(url)
            .then(resp => resp.json())
            .then(json => this._parseData(json));
    }

    _buildUrl(stationId, directionId, lines) {
        const linesStr = lines.join('%2C', lines);
        return `https://api.tfl.gov.uk/Line/${linesStr}/Arrivals/${stationId}?direction=${directionId}`;
    }

    _parseData(json) {
        return json.map((arrival) => {
            const lineName = arrival.lineName;
            const destinationName = arrival.destinationName;
            const expectedIn = arrival.timeToStation;
            return new ArrivalTime(lineName, destinationName, expectedIn);
        }).sort((a, b) => a.expectedSeconds - b.expectedSeconds);
    }
}
/* eslint-enable class-methods-use-this */

export default TfLDataAPIService;
