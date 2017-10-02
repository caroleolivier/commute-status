/* eslint-env browser, jest */
import fetchMock from 'fetch-mock';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import BusStationContainer from '../../src/bus/BusStationContainer';

describe('BusStationContainer component', () => {
    const busStation = {
        stationName: 'Bla Street',
        stationId: '49030283ID',
        direction: 'Waterloo',
        directionId: 'outbound',
        buses: ['10', 'N20']
    };
    let busStationContainer;
    let fetchDataObj;
    let promise;

    describe('Given component was mounted successfully', () => {
        beforeEach(() => {
            promise = new Promise((resolve, reject) => {
                fetchDataObj = { resolve, reject };
            });
            fetchMock.get('*', promise);
            busStationContainer = shallow(<BusStationContainer busStation={busStation} />);
        });

        afterEach(() => {
            fetchMock.restore();
        });

        test('it displays a loading state', () => {
            const tree = toJson(busStationContainer);
            expect(tree).toMatchSnapshot('loading');
        });

        test('it should send a request to load bus expected arrivals', () => {
            fetchMock.called('https://api.tfl.gov.uk/Line/10%2CN20/Arrivals/49030283ID?direction=outbound');
        });

        describe('Given the server request was successful', () => {
            const busArrivals = [
                { lineName: '10', stationName: 'Bla Street', timeToStation: 60 },
                { lineName: '10', stationName: 'Bla Street', timeToStation: 90 },
                { lineName: '20', stationName: 'Bla Street', timeToStation: 30 }
            ];

            beforeEach(() => {
            });

            test('it should load the bus expected arrivals', () => {
                fetchDataObj.resolve(busArrivals);
                busStationContainer.update();
                console.log('testing')
                const tree = toJson(busStationContainer);
                expect(busStationContainer.instance().state.state).toEqual('loaded');
                expect(tree).toMatchSnapshot('loaded');
            });
        });

        describe('Given the server request failed', () => {
            test('it should display an error message', () => {

            });
        });
    });
});


// describe('BusStationContainer component', () => {
//     const busArrivals = [
//         { lineName: '10', stationName: 'Bla Street', timeToStation: 60 },
//         { lineName: '10', stationName: 'Bla Street', timeToStation: 90 },
//         { lineName: '20', stationName: 'Bla Street', timeToStation: 30 }
//     ];
//     beforeEach(() => {
//         fetchMock.get('https://api.tfl.gov.uk/Line/10%2CN20/Arrivals/49030283ID?direction=outbound',
//             busArrivals);
//     });

//     afterEach(() => {
//         fetchMock.restore();
//     });

//     test('shallow render matches snapshot.', () => {
//         const busStation = {
//             stationName: 'Bla Street',
//             stationId: '49030283ID',
//             direction: 'Waterloo',
//             directionId: 'outbound',
//             buses: ['10', 'N20']
//         };
//         const busStationContainer = shallow(<BusStationContainer busStation={busStation} />);
//         const tree = toJson(busStationContainer);
//         expect(tree).toMatchSnapshot('rendering');
//     });
// });
