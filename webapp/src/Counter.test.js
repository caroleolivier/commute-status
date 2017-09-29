// /* eslint-env browser, jest */

// import React from 'react';
// import ReactDOM from 'react-dom';
// import testRenderer from 'react-test-renderer';
// import { shallow } from 'enzyme';

// import Counter from './Counter';

// describe('Counter component', () => {
//     test('renders without crashing', () => {
//         // test with a DOM and renders deeply (as opposed to a shallowly, i.e. one level deep)
//         // disabling the eslint rule. Need to replace that test in the future.
//         /* eslint-disable react/no-render-return-value */
//         const div = document.createElement('div');
//         expect(() => ReactDOM.render(<Counter />, div)).not.toThrow();
//         /* eslint-enable react/no-render-return-value */
//     });

//     test('initial DOM matches snapshot', () => {
//         // rendering doesn't depend on the DOM
//         const component = testRenderer.create(
//             <Counter />
//         );
//         const tree = component.toJSON();
//         expect(tree).toMatchSnapshot('rendering');
//     });

//     test('increments its counter by one on click event', () => {
//         const counterWrapper = shallow(<Counter />);
//         const counter = counterWrapper.instance();

//         expect(counter.state.counter).toBe(0);

//         counterWrapper.simulate('click');
//         expect(counter.state.counter).toBe(1);
//     });
// });
