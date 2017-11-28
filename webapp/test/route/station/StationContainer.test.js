/* eslint-env browser, jest */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import TfLDataAPIService from '../../../src/services/TfLDataAPIService.ts';

import StationContainer, { StationContainerState } from '../../../src/route/station/StationContainer';

describe('StationContainer component', () => {
    let stubService;

    const stationConfig = {
        type: 'bus',
        stationName: 'Waterloo',
        stationId: '1234DWWEF',
        direction: 'North',
        directionId: 'outbound',
        lines: ['jubilee']
    };
    let stationContainer;
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
            stationContainer = shallow(<StationContainer config={stationConfig} />);
        });

        test('it displays a loading state', () => {
            expect(stationContainer.instance().state.state).toEqual(StationContainerState.LOADING);
            const tree = toJson(stationContainer);
            expect(tree).toMatchSnapshot('loading');
        });

        test('it should send a request to load expected arrivals', () => {
            expect(stubService.calledWith(stationConfig)).toBeTruthy();
        });

        describe('Given the server request was successful', () => {
            test('it should load the expected time arrivals', () => {
                const arrivals = [
                    { lineName: '10', stationName: 'Waterloo', timeToStation: 60 },
                    { lineName: '10', stationName: 'Waterloo', timeToStation: 90 },
                    { lineName: '20', stationName: 'Waterloo', timeToStation: 30 }
                ];
                fetchDataObj.resolve(arrivals);

                return promise.then(() => {
                    // force wrapper to update
                    stationContainer.update();
                    expect(stationContainer.instance().state.state).toEqual(StationContainerState.LOADED);
                    const tree = toJson(stationContainer);
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
                        stationContainer.update();
                        expect(stationContainer.instance().state.state).toEqual(StationContainerState.ERROR);
                        const tree = toJson(stationContainer);
                        expect(tree).toMatchSnapshot('error');
                    });
            });
        });
    });
});
