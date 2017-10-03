class ArrivalTime {
    constructor(lineName, destinationName, expectedSeconds) {
        this._lineName = lineName;
        this._destinationName = destinationName;
        this._expectedSeconds = expectedSeconds;
    }

    get lineName() {
        return this._lineName;
    }

    get expectedSeconds() {
        return this._expectedSeconds;
    }

    get destinationName() {
        return this._destinationName;
    }
}

export default ArrivalTime;
