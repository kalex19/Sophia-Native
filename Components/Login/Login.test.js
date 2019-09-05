import React from 'react';
import Login from './Login';
import renderer from 'react-test-renderer';
import 'react-native';

test('Login renders correctly', () => {
  const snapshot = renderer.create(<Login />).toJSON();
  expect(snapshot).toMatchSnapshot();
});