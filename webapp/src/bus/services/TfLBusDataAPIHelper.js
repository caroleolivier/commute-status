import BusArrivalTime from './BusArrivalTime';

function buildUrl(stationId, directionId, buses) {
    const busesStr = buses.join('%2C', buses);
    return `https://api.tfl.gov.uk/Line/${busesStr}/Arrivals/${stationId}?direction=${directionId}`;
}

function parseBusArrival(json) {
    return json.map((busArrival) => {
        const busName = busArrival.lineName;
        const expectedIn = busArrival.timeToStation;
        return new BusArrivalTime(busName, expectedIn);
    }).sort((a, b) => a.expectedSeconds - b.expectedSeconds);
}

export { parseBusArrival, buildUrl };
