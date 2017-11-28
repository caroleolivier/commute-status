using train.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Options;
using OpenLDBWS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace train.Controllers
{
    [Route(template: "api/live/arrivals")]
    [EnableCors("AllowAllOrigins")]
    public class LiveArrivalDataController : Controller
    {
        private readonly OpenLDBServiceConfig _serviceConfig;

        public LiveArrivalDataController(IOptions<OpenLDBServiceConfig> serviceConfigAccessor)
        {
            _serviceConfig = serviceConfigAccessor.Value;
        }

        // http://<servername>:<port>/api/live/arrivals/EAD/to/WAT/10/0/30
        // http://<servername>:<port>/api/live/arrivals/EAD/from/WAT/10/0/30
        [HttpGet("{station}/{direction}/{filterStation}/{resultno}/{offset}/{window}")]
        public async Task<IEnumerable<ArrivalTime>> Get(string station, FilterType direction, string filterStation, ushort resultno, int offset, int window)
        {
            var client = new LDBServiceSoapClient(new LDBServiceSoapClient.EndpointConfiguration(), _serviceConfig.Address);
            var token = new AccessToken() { TokenValue = _serviceConfig.Key };

            GetArrivalBoardResponse res = await client.GetArrivalBoardAsync(token, resultno, station, filterStation, direction, offset, window);

            return res.GetStationBoardResult.trainServices
                .Select(item => ToArrivalTime(station, direction.ToString(), filterStation, item))
                .Where(ta => ta.FilterStationCrs.Contains(filterStation)) // there is a bug in the API I think where it returns trains that should be filtered
                .ToArray();
        }

        private ArrivalTime ToArrivalTime(string stationCrs, string direction, string filterStationCrs, ServiceItem1 serviceItem1) {
            string destination = string.Join(",", serviceItem1.destination.Select(d => d.locationName));
            (string,int) expectedTime = CalculateExpectedTime(serviceItem1);
            return new ArrivalTime(stationCrs, direction, filterStationCrs, destination, expectedTime.Item2, expectedTime.Item1);
        }
        private (string, int) CalculateExpectedTime(ServiceItem1 serviceItem1)
        {
            string expectedTimeStr = serviceItem1.eta == "On time" ? serviceItem1.sta : serviceItem1.eta;
            TimeSpan expectedTime = TimeSpan.TryParse(expectedTimeStr, out TimeSpan ts) ? ts : TimeSpan.MaxValue;
            int expectedSecs = Convert.ToInt32(ts.Subtract(DateTime.Now.TimeOfDay).TotalSeconds);
            int ignoreNegative = expectedSecs < 0 ? 0 : expectedSecs; // because it means due

            return (expectedTimeStr, ignoreNegative);
        }
    }
}
