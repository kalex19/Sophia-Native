import React from 'react';
import {CreateAccount} from './CreateAccount';
import renderer from 'react-test-renderer';
import 'react-native';

test('CreateAccount renders correctly', () => {
  const snapshot = renderer.create(<CreateAccount />).toJSON();
  expect(snapshot).toMatchSnapshot();
});