import React from 'react';
import ClientList from './ClientList';
import renderer from 'react-test-renderer';
import 'react-native';

test('ClientList renders correctly', () => {
  const snapshot = renderer.create(<ClientList />).toJSON();
  expect(snapshot).toMatchSnapshot();
});