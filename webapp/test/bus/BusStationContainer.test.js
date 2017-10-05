/* eslint-env browser, jest */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import TfLDataAPIService from '../../src/services/TfLDataAPIService';

import BusStationContainer, { BusStationContainerState } from '../../src/bus/BusStationContainer';

describe('BusStationContainer component', () => {
    let stubService;

    const busStation = {
        stationName: 'Bla Street',
        stationId: '49030283ID',
        direction: 'Waterloo',
        directionId: 'outbound',
        lines: ['10', 'N20']
    };
    let busStationContainer;
    let fetchDataObj;
    let promise;

    beforeEach(() => {
        promise = new Promise((resolve, reject) => {
            fetchDataObj = { resolve, reject };
        });
        stubService = sinon.stub(TfLDataAPIService.prototype, 'fetchArrivals');
        stubService.returns(promise);
    });

    afterEach(() => {
        stubService.restore();
    });

    describe('Given component was mounted successfully', () => {
        beforeEach(() => {
            busStationContainer = shallow(<BusStationContainer config={busStation} />);
        });

        test('it displays a loading state', () => {
            expect(busStationContainer.instance().state.state).toEqual(BusStationContainerState.LOADING);
            const tree = toJson(busStationContainer);
            expect(tree).toMatchSnapshot('loading');
        });

        test('it should send a request to load bus expected arrivals', () => {
            expect(stubService.calledWith(busStation.stationId,
                busStation.directionId, busStation.lines)).toBeTruthy();
        });

        describe('Given the server request was successful', () => {
            test('it should load the bus expected time arrivals', () => {
                const busArrivals = [
                    { lineName: '10', stationName: 'Bla Street', timeToStation: 60 },
                    { lineName: '10', stationName: 'Bla Street', timeToStation: 90 },
                    { lineName: '20', stationName: 'Bla Street', timeToStation: 30 }
                ];
                fetchDataObj.resolve(busArrivals);

                return promise.then(() => {
                    // force wrapper to update
                    busStationContainer.update();
                    expect(busStationContainer.instance().state.state).toEqual(BusStationContainerState.LOADED);
                    const tree = toJson(busStationContainer);
                    expect(tree).toMatchSnapshot('loaded');
                });
            });
        });

        describe('Given the server request failed', () => {
            test('it should display an error message', () => {
                fetchDataObj.reject('something wrong happened');

                return promise
                    .then(() => {
                        throw new Error('Should not be called');
                    })
                    .catch(() => {
                        // force wrapper to update
                        busStationContainer.update();
                        expect(busStationContainer.instance().state.state).toEqual(BusStationContainerState.ERROR);
                        const tree = toJson(busStationContainer);
                        expect(tree).toMatchSnapshot('error');
                    });
            });
        });
    });
});
