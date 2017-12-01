namespace train.Model
{
    public sealed class ArrivalTime
    {
        public ArrivalTime(string stationCrs, string direction, string filterStationCrs, string destination, int expectedSecs, string expectedTime)
        {
            StationCrs = stationCrs;
            Direction = direction;
            FilterStationCrs = filterStationCrs;
            Destination = destination;
            ExpectedSecs = expectedSecs;
            ExpectedTime = expectedTime;
        }

        /// <summary>
        /// Station code to look up.
        /// </summary>
        public string StationCrs { get; }

        /// <summary>
        /// Direction between StationCode and FilterStationCode.
        /// </summary>
        public string Direction { get; }

        /// <summary>
        /// The station code to use for filtering.
        /// </summary>
        public string FilterStationCrs { get; }

        /// <summary>
        /// The final destination of the train.
        /// </summary>
        public string Destination { get; }

        /// <summary>
        /// Expected arrival in Seconds.
        /// </summary>
        public int ExpectedSecs { get; }

        /// <summary>
        /// The expected timere returned by datasource.
        /// </summary>
        public string ExpectedTime { get; }
    }
}
