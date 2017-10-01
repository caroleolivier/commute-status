class BusArrivalTime {
    constructor(busNo, expectedSeconds) {
        this._busNo = busNo;
        this._expectedSeconds = expectedSeconds;
    }

    get busNo() {
        return this._busNo;
    }

    get expectedSeconds() {
        return this._expectedSeconds;
    }
}

export default BusArrivalTime;
