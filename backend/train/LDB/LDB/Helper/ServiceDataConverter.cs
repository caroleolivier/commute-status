using LDB.Model;
using OpenLDBWS;
using System;
using System.Linq;

namespace LDB.Helper
{
    public static class ServiceDataConverterExtensions
    {
        public static ArrivalTime ToTimeArrival(this ServiceItem1 serviceItem1, string stationReference)
        {
            string expectedTimeStr = serviceItem1.eta == "On time" ? serviceItem1.sta : serviceItem1.eta;

            TimeSpan expectedTime = TimeSpan.TryParse(expectedTimeStr, out TimeSpan ts) ? ts : TimeSpan.MaxValue;

            int expectedSecs = Convert.ToInt32(ts.Subtract(DateTime.Now.TimeOfDay).TotalSeconds);

            int ignoreNegative = expectedSecs < 0 ? 0 : expectedSecs; // because it means due

            return new ArrivalTime(stationReference, string.Join(",", serviceItem1.destination.Select(d => d.crs)), serviceItem1.@operator, ignoreNegative, expectedTimeStr);
        }
    }
}
