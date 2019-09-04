import React from 'react';
import ClientTask from './ClientTask';
import renderer from 'react-test-renderer';
import 'react-native';

test('ClientTask renders correctly', () => {
  const snapshot = renderer.create(<ClientTask />).toJSON();
  expect(snapshot).toMatchSnapshot();
});