/* eslint-env browser, jest */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import CommuteRoute from '../../src/route/CommuteRoute';

describe('CommuteRoute', () => {
    describe('Given route name and a list of stops', () => {
        const routeName = 'Via the Moon';
        const stops = [
            {
                type: 'bus',
                stationName: 'River',
                stationId: '490008430E',
                direction: 'Saturne',
                directionId: 'outbound',
                lines: ['L1', 'L2']
            },
            {
                type: 'tube',
                stationName: 'Sea',
                stationId: '940GZZLUTBY',
                direction: 'Mars',
                directionId: 'inbound',
                lines: ['N1']
            }
        ];
        let commuteRouteWrapper;

        beforeEach(() => {
            commuteRouteWrapper = shallow(<CommuteRoute routeName={routeName} stops={stops} />);
        });

        test('it creates the correct stop components', () => {
            const tree = toJson(commuteRouteWrapper);
            expect(tree).toMatchSnapshot('routes');
        });
    });
});
