/* eslint-env browser */
/* eslint-disable class-methods-use-this */

import TfLDataParser from './TfLDataParser.ts';

class TfLDataAPIService {
    constructor() {
        this.parser = new TfLDataParser();
    }
    fetchArrivals(input) {
        const url = this._buildUrl(input.stationId, input.directionId, input.lines);
        return fetch(url)
            .then(resp => resp.json())
            .then(json => this.parser.parse(json));
    }

    _buildUrl(stationId, directionId, lines) {
        const linesStr = lines.join('%2C', lines);
        return `https://api.tfl.gov.uk/Line/${linesStr}/Arrivals/${stationId}?direction=${directionId}`;
    }
}
/* eslint-enable class-methods-use-this */

export default TfLDataAPIService;
