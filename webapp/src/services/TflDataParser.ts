import ArrivalTime from './ArrivalTime';

export default class TflDataParser {
    parse(json: any[]): ArrivalTime[] {
        return json.map((arrival) => {
            const lineName: string = arrival.lineName;
            const destinationName: string = arrival.destinationName;
            const expectedIn: number = arrival.timeToStation;

            return new ArrivalTime(lineName, destinationName, expectedIn);
        });
    }
}