import React from 'react';
import ClientProfile from './ClientProfile';
import renderer from 'react-test-renderer';
import 'react-native';

test('Client Profile renders correctly', () => {
  const snapshot = renderer.create(<ClientProfile />).toJSON();
  expect(snapshot).toMatchSnapshot();
});