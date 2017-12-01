import 'jest';
import 'whatwg-fetch';
import * as sinon from 'sinon';

import { ArrivalTime } from '../../src/services/ArrivalTime';
import { TfLDataAPIService, TfLStationArrivalInput } from '../../src/services/TfLDataAPIService';

describe('TfLDataAPIService service', () => {
    let service: TfLDataAPIService;
    let fetchStub: sinon.SinonStub;
    let fetchPromise: Promise<Response>;
    let fetchDataObj: {resolve: (resp: Response) => void, reject: (reason: any) => void};
    let returnPromise: Promise<ArrivalTime[]>;
    const params: TfLStationArrivalInput = {
        stationId: 'XESUEHR1234',
        directionId: 'outbound',
        lines: ['N40', 'northern']
    };

    beforeEach(() => {
        fetchPromise = new Promise<Response>((resolve, reject) => {
            fetchDataObj = { resolve, reject };
        });
        service = new TfLDataAPIService();
        fetchStub = sinon.stub(service.fetchService, 'fetch').returns(fetchPromise);
    });

    afterEach(() => {
        fetchStub.restore();
    });

    describe('Given parameters then call to fetchData', () => {
        beforeEach(() => {
            returnPromise = service.fetchArrivals(params);
        });

        test('Sends the right request to the server', () => {
            const expectedUrl = 'https://api.tfl.gov.uk/Line/N40%2Cnorthern/Arrivals/XESUEHR1234?direction=outbound';
            expect(fetchStub.calledWith(expectedUrl)).toBeTruthy();
        });

        describe('Given the request returns successfully', () => {
            describe('Given the return data format is correct', () => {
                test('it parses successful the data', () => {
                    const data = [
                        {
                            lineName: '1',
                            destinationName: 'one',
                            timeToStation: 30
                        },
                        {
                            lineName: '2',
                            destinationName: 'two',
                            timeToStation: 90
                        }
                    ];
                    const expectedData = [
                        new ArrivalTime('1', 'one', 30),
                        new ArrivalTime('2', 'two', 90)
                    ];
                    const resp = new Response(JSON.stringify(data));
                    fetchDataObj.resolve(resp);
                    return returnPromise.then((arrivals) => {
                        expect(arrivals).toEqual(expectedData);
                    });
                });
            });

            describe('Given the return data is incorrect', () => {
                test('it throws an exception', () => {
                    const malformattedData = { bla: 'I am not well formatted' };
                    const resp = new Response(JSON.stringify(malformattedData));
                    fetchDataObj.resolve(resp);
                    return returnPromise
                        .then(() => {
                            throw new Error('Should not be called');
                        })
                        .catch((ex) => {
                            expect(ex).not.toBeNull();
                        });
                });
            });
        });

        describe('Given the request fails', () => {
            test('it throws an exception', () => {
                const expectedEx = new Error('Intentionally failing');
                fetchDataObj.reject(expectedEx);
                return returnPromise
                    .then(() => {
                        throw new Error('Should not be called');
                    })
                    .catch((ex) => {
                        expect(ex).toEqual(expectedEx);
                    });
            });
        });
    });
});
