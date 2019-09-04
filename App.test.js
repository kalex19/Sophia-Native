import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import 'react-native';

test('App renders correctly', () => {
  const snapshot = renderer.create(<App />).toJSON();
  expect(snapshot).toMatchSnapshot();
});
