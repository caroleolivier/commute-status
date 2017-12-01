import { IDataAPIService } from './IDataApiService';
import { ArrivalTime } from './ArrivalTime';

class DataType {
    constructor(
        readonly stationCrs: string,
        readonly direction: string,
        readonly filterStationCrs: string,
        readonly destination: string,
        readonly expectedSecs: number,
        readonly expectedTime: string,
        ) {

        }
}

export class NationalRailAPIService implements IDataAPIService {
    fetchArrivals(input: any): Promise<ArrivalTime[]> {
        // http://<servername>:<port>/api/live/arrivals/EAD/to/WAT/10/0/30
        const url = `http://localhost:12015/api/live/arrivals/${input.stationId}/${input.filterDirection}/${input.destinationId}/10/0/30`;
        return fetch(url)
            .then(resp => resp.json())
            .then(json => this._parseData(json));
    }

    _parseData(json: DataType[]): ArrivalTime[] {
        return json.map(item => new ArrivalTime(item.destination, item.destination, item.expectedSecs));
    }
}
