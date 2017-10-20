using LDB.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OpenLDBWS;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LDB.Controllers
{
    [Route(template: "api/live/arrivals")]
    public class LiveArrivalDataController : Controller
    {
        private readonly OpenLDBServiceConfig _serviceConfig;

        public LiveArrivalDataController(IOptions<OpenLDBServiceConfig> serviceConfigAccessor)
        {
            _serviceConfig = serviceConfigAccessor.Value;
        }

        // http://<servername>:<port>/api/live/arrivals/EAD/WAT/to/10/0/30
        [HttpGet("{at}/{destination}/{filterdirection}/{resultno}/{offset}/{window}")]
        public async Task<IEnumerable<TrainArrival>> Get(string at, string destination, FilterType filterdirection, ushort resultno, int offset, int window)
        {
            var client = new LDBServiceSoapClient(new LDBServiceSoapClient.EndpointConfiguration(), _serviceConfig.Address);
            var token = new AccessToken() { TokenValue = _serviceConfig.Key };

            GetArrivalBoardResponse res = await client.GetArrivalBoardAsync(token, resultno, at, destination, filterdirection, offset, window);

            return res.GetStationBoardResult.trainServices.Select(ts => new TrainArrival(at, ts.sta, ts.eta, string.Join(",", ts.destination.Select(d => d.crs)))).ToArray();
        }
    }
}
