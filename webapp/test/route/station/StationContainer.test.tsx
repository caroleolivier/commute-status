import 'jest';
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';

import { TfLDataAPIService } from '../../../src/services/TfLDataAPIService';
import { ArrivalTime } from '../../../src/services/ArrivalTime';
import { IStationContainerConfig } from '../../../src/config/configtype';
import { StationContainer, IStationContainerProps, IStationContainerState, stationContainerStates } from '../../../src/route/station/StationContainer';

describe('StationContainer component', () => {
    let stubService: sinon.SinonStub;

    const stationConfig: IStationContainerConfig = {
        type: 'bus',
        stationName: 'Waterloo',
        stationId: '1234DWWEF',
        travelDirection: 'Richmond'
    };
    let stationContainer: ShallowWrapper<IStationContainerProps, IStationContainerState>;
    
    let fetchDataObj: {resolve: (arrivals: ArrivalTime[]) => void, reject: (reason: any) => void};
    let promise: Promise<ArrivalTime[]>;

    beforeEach(() => {
        promise = new Promise<ArrivalTime[]>((resolve, reject) => {
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
            expect(stationContainer.instance().state.state).toEqual(stationContainerStates.get('LOADING'));
            const tree = toJson(stationContainer);
            expect(tree).toMatchSnapshot('loading');
        });

        test('it should send a request to load expected arrivals', () => {
            expect(stubService.calledWith(stationConfig)).toBeTruthy();
        });

        describe('Given the server request was successful', () => {
            test('it should load the expected time arrivals', () => {
                const arrivals: ArrivalTime[] = [
                    { lineName: '10', destinationName: 'Waterloo', expectedSeconds: 60 },
                    { lineName: '10', destinationName: 'Waterloo', expectedSeconds: 90 },
                    { lineName: '20', destinationName: 'Waterloo', expectedSeconds: 30 }
                ];
                fetchDataObj.resolve(arrivals);

                return promise.then(() => {
                    // force wrapper to update
                    stationContainer.update();
                    expect(stationContainer.instance().state.state).toEqual(stationContainerStates.get('LOADED'));
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
                        expect(stationContainer.instance().state.state).toEqual(stationContainerStates.get('ERROR'));
                        const tree = toJson(stationContainer);
                        expect(tree).toMatchSnapshot('error');
                    });
            });
        });
    });
});
