/* eslint-env browser, jest */

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import BusStationContainer from '../../src/bus/BusStationContainer';

describe('BusStationContainer component', () => {
    test('shallow render matches snapshot.', () => {
        const busStation = {
            stationName: 'Huntspill Street',
            stationId: '490008430W',
            direction: 'Earlsfield',
            buses: ['77', '44', '270']
        };
        const busStationContainer = shallow(<BusStationContainer busStation={busStation} />);
        const tree = toJson(busStationContainer);
        expect(tree).toMatchSnapshot('rendering');
    });
});
