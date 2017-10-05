/* eslint-env browser, jest */

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TubeStations from '../../src/tube/TubeStations';

describe('TubeStations component', () => {
    test('shallow render matches snapshot.', () => {
        const tubeStations = [
            { stationName: 'Houston', stationId: '12345', direction: 'inbound', lineName: 'northern' }
        ];
        const busStationContainer = shallow(<TubeStations tubeStations={tubeStations} />);
        const tree = toJson(busStationContainer);
        expect(tree).toMatchSnapshot('rendering');
    });
});
