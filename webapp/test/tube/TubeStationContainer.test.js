/* eslint-env browser, jest */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import TfLDataAPIService from '../../src/services/TfLDataAPIService';

import TubeStationContainer, { TubeStationContainerState } from '../../src/tube/TubeStationContainer';

describe('TubeStationContainer component', () => {
    let stubService;

    const tubeStationConfig = {
        stationName: 'Waterloo',
        stationId: '1234DWWEF',
        direction: 'North',
        directionId: 'outbound',
        lines: ['jubilee']
    };
    let tubeStationContainer;
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
            tubeStationContainer = shallow(<TubeStationContainer config={tubeStationConfig} />);
        });

        test('it displays a loading state', () => {
            expect(tubeStationContainer.instance().state.state).toEqual(TubeStationContainerState.LOADING);
            const tree = toJson(tubeStationContainer);
            expect(tree).toMatchSnapshot('loading');
        });

        test('it should send a request to load bus expected arrivals', () => {
            expect(stubService.calledWith(tubeStationConfig.stationId,
                tubeStationConfig.directionId, tubeStationConfig.lines)).toBeTruthy();
        });

        describe('Given the server request was successful', () => {
            test('it should load the tube expected time arrivals', () => {
                const tubeArrivals = [
                    { lineName: '10', stationName: 'Waterloo', timeToStation: 60 },
                    { lineName: '10', stationName: 'Waterloo', timeToStation: 90 },
                    { lineName: '20', stationName: 'Waterloo', timeToStation: 30 }
                ];
                fetchDataObj.resolve(tubeArrivals);

                return promise.then(() => {
                    // force wrapper to update
                    tubeStationContainer.update();
                    expect(tubeStationContainer.instance().state.state).toEqual(TubeStationContainerState.LOADED);
                    const tree = toJson(tubeStationContainer);
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
                        tubeStationContainer.update();
                        expect(tubeStationContainer.instance().state.state).toEqual(TubeStationContainerState.ERROR);
                        const tree = toJson(tubeStationContainer);
                        expect(tree).toMatchSnapshot('error');
                    });
            });
        });
    });
});
