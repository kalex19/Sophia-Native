import React from 'react';
import IndividualList from './IndividualList';
import renderer from 'react-test-renderer';
import 'react-native';

test('IndividuaList renders correctly', () => {
  const snapshot = renderer.create(<IndividualList />).toJSON();
  expect(snapshot).toMatchSnapshot();
});