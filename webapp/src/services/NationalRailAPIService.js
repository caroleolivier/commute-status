/* eslint-env browser */
/* eslint-disable class-methods-use-this */

import ArrivalTime from './ArrivalTime';

class NationalRailAPIService {
    fetchArrivals(input) {
        // http://<servername>:<port>/api/live/arrivals/EAD/WAT/to/10/0/30
        const url = `http://localhost:12015/api/live/arrivals/${input.stationId}/${input.destinationId}/${input.filterDirection}/10/0/30`;
        return fetch(url)
            .then(resp => resp.json())
            .then(json => this._parseData(json));
    }

    _parseData(json) {
        return json.map(item => new ArrivalTime(item.lineName, item.destinationCode, item.expectedSecs));
    }
}

export default NationalRailAPIService;
