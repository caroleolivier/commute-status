/* eslint-env browser, jest */

import React from 'react';
import ReactDOM from 'react-dom';
import testRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import BusStations from '../../src/bus/BusStations';

describe('BusStations component', () => {
    test('shallow render matches snapshot.', () => {
        const busStations = [
            { stationName: 'Houston', stationId: '12345', direction: 'Outter Space', buses: ['1', '2'] },
            { stationName: 'Moon', stationId: '8372hf8', direction: 'Saturne', buses: ['N12'] }
        ];
        const busStationContainer = shallow(<BusStations direction="Neptune" busStations={busStations}/>);
        let tree = toJson(busStationContainer)
        expect(tree).toMatchSnapshot('rendering');
    });
});
