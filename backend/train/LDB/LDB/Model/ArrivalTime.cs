namespace LDB.Model
{
    public sealed class ArrivalTime
    {
        public ArrivalTime(string atStationCode, string destinationCode, string lineName, int expectedSecs, string expectedTime)
        {
            AtStationCode = atStationCode;
            DestinationCode = destinationCode;
            LineName = lineName;
            ExpectedSecs = expectedSecs;
            ExpectedTime = expectedTime;
        }

        /// <summary>
        /// Station code we are interested in.
        /// </summary>
        public string AtStationCode { get; }

        /// <summary>
        /// Final destination code.
        /// </summary>
        public string DestinationCode { get; }

        /// <summary>
        /// The train operator for that train.
        /// </summary>
        public string LineName { get; }

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
