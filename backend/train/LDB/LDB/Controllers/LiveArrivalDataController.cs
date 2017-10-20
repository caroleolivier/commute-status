using LDB.Model;
using Microsoft.AspNetCore.Mvc;
using OpenLDBWS;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LDB.Controllers
{
    [Route(template: "api/live/arrivals")]
    public class LiveArrivalDataController : Controller
    {
        private static string TempToken = "";

        [HttpGet]
        public async Task<IEnumerable<TrainArrival>> Get()
        {
            var client = new LDBServiceSoapClient(new LDBServiceSoapClient.EndpointConfiguration());
            var token = new AccessToken() { TokenValue = TempToken };
            const string station = "EAD";
            const string filterDestination = "WAT";
            var filter = FilterType.to;
            ushort noResults = 10;
            int offset = 0;
            int window = 30;

            GetArrivalBoardResponse res = await client.GetArrivalBoardAsync(token, noResults, station, filterDestination, filter, offset, window);

            return res.GetStationBoardResult.trainServices.Select(ts => new TrainArrival(station, ts.sta, ts.eta, string.Join(",", ts.destination.Select(d => d.locationName)))).ToArray();
        }

        // http://<servername>:<port>/api/live/arrivals/EAD/WAT/to/20/0/30
        [HttpGet("{at}/{destination}/{filterdirection}/{resultno}/{offset}/{window}")]
        public async Task<IEnumerable<TrainArrival>> Get(string at, string destination, FilterType filterdirection, ushort resultno, int offset, int window)
        {
            var client = new LDBServiceSoapClient(new LDBServiceSoapClient.EndpointConfiguration(), "https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb10.asmx");
            var token = new AccessToken() { TokenValue = TempToken };

            GetArrivalBoardResponse res = await client.GetArrivalBoardAsync(token, resultno, at, destination, filterdirection, offset, window);

            return res.GetStationBoardResult.trainServices.Select(ts => new TrainArrival(at, ts.sta, ts.eta, string.Join(",", ts.destination.Select(d => d.locationName)))).ToArray();
        }
    }
}
