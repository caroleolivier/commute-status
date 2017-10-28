/* eslint-env browser, jest */
import sinon from 'sinon';
import 'whatwg-fetch';

import ArrivalTime from '../../src/services/ArrivalTime';
import TfLDataAPIService from '../../src/services/TfLDataAPIService';

describe('TfLDataAPIService service', () => {
    let service;
    let fetchStub;
    let fetchPromise;
    let fetchDataObj;
    let returnPromise;
    const params = {
        stationId: 'XESUEHR1234',
        directionId: 'outbound',
        lines: ['N40', 'northern']
    };

    beforeEach(() => {
        fetchPromise = new Promise((resolve, reject) => {
            fetchDataObj = { resolve, reject };
        });
        fetchStub = sinon.stub(global, 'fetch').returns(fetchPromise);
        service = new TfLDataAPIService();
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
                    const resp = new window.Response(JSON.stringify(data), {
                        status: 200,
                        headers: {
                            'Content-type': 'application/json'
                        }
                    });
                    fetchDataObj.resolve(resp);
                    return returnPromise.then((arrivals) => {
                        expect(arrivals).toEqual(expectedData);
                    });
                });
            });

            describe('Given the return data is incorrect', () => {
                test('it throws an exception', () => {
                    const malformattedData = { bla: 'I am not well formatted' };
                    const resp = new window.Response(JSON.stringify(malformattedData), {
                        status: 200,
                        headers: {
                            'Content-type': 'application/json'
                        }
                    });
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
