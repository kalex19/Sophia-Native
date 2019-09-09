import React from 'react';
import { shallow } from 'enzyme';
import IndividualList from './IndividualList';
import renderer from 'react-test-renderer';
import 'react-native';
import { TouchableHighlight } from "react-native-gesture-handler";

// test('IndividuaList renders correctly', () => {
//   const snapshot = renderer.create(<IndividualList />).toJSON();
//   expect(snapshot).toMatchSnapshot();
// });

describe('IndividualList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<IndividualList />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
