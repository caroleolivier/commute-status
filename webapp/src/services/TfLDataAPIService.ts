import TfLDataParser from './TfLDataParser';
import ArrivalTime from './ArrivalTime';

export interface TfLStationArrivalInput {
    stationId: string,
    directionId: string,
    lines: string[]
}

export interface FetchFacade {
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
}

export default class TfLDataAPIService {
    parser: TfLDataParser;
    fetchService: FetchFacade;

    constructor() {
        this.fetchService = { fetch: (params) => fetch(params) };
        this.parser = new TfLDataParser();
    }

    fetchArrivals(input: TfLStationArrivalInput): Promise<ArrivalTime[]> {
        const url = this._buildUrl(input.stationId, input.directionId, input.lines);
        return this.fetchService.fetch(url)
            .then(resp => resp.json())
            .then(json => this.parser.parse(json));
    }

    _buildUrl(stationId: string, directionId: string, lines: string[]): string {
        const linesStr = lines.join('%2C');
        return `https://api.tfl.gov.uk/Line/${linesStr}/Arrivals/${stationId}?direction=${directionId}`;
    }
}
