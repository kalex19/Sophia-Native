// import React from 'react';
// import App from './App';
// import renderer from 'react-test-renderer';

// test('renders correctly', () => {
//   const tree = renderer.create(<App />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

import React from 'react';
import { App } from './App';
import { shallow } from 'enzyme';

describe('App', () => {
	let wrapper, instance;

	beforeEach(() => {
		wrapper = shallow(
			<App />
		);
		instance = wrapper.instance();
	});

	it(`matches snapshot`, () => {
		expect(wrapper).toMatchSnapshot();
  });
});