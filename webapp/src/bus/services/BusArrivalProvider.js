import BusArrivalTime from './BusArrivalTime';

class BusArrivalProvider {
    /* eslint-disable class-methods-use-this */
    getBusArrivals(stationId, busNo) {
        return [
            new BusArrivalTime('77', 10),
            new BusArrivalTime('270', 65),
            new BusArrivalTime('77', 100),
            new BusArrivalTime('44', 180)
        ];
    }
    /* eslint-enable class-methods-use-this */
}

export default BusArrivalProvider;
