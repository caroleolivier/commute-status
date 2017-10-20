namespace LDB.Model
{
    public sealed class TrainArrival
    {
        public TrainArrival(string atCrs, string sta, string eta, string destinationCrs)
        {
            AtCrs = atCrs;
            DestinationCrs = destinationCrs;
            Sta = sta;
            Eta = eta;
        }

        public string AtCrs { get; }
        public string DestinationCrs { get; }
        public string Sta { get; }
        public string Eta { get; }
    }
}
