import 'jest';
import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { CommuteRoute, ICommuteRouteConfig } from '../../src/route/CommuteRoute';

describe('CommuteRoute', () => {
    describe('Given route name and a list of stops', () => {
        const config: ICommuteRouteConfig = {
            routeName: 'Via the Moon',
            stops: [
                {
                    type: 'bus',
                    stationName: 'River',
                    stationId: '2erwerq',
                    travelDirection: 'Saturne'
                },
                {
                    type: 'tube',
                    stationName: 'Sea',
                    stationId: 'qwerds',
                    travelDirection: 'Mars'
                }
            ]
        };

        test('it creates the correct stop components', () => {
            let commuteRouteWrapper = shallow(<CommuteRoute config={config} />);
            const tree = toJson(commuteRouteWrapper);
            expect(tree).toMatchSnapshot('routes');
        });
    });
});
