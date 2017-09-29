/* eslint-env browser, jest */

import React from 'react';
import ReactDOM from 'react-dom';
import testRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import BusArrivalWrapper from '../../src/bus/BusArrivalWrapper';

describe('BusArrivalWrapper component', () => {
    test('shallow render without crashing', () => {
        const busArrivalWrapper = shallow(<BusArrivalWrapper />);
        let tree = toJson(busArrivalWrapper)
        expect(tree).toMatchSnapshot('rendering');
    });
});
