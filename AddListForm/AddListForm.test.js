import React from 'react';
import AddListForm from './AddListForm';
import renderer from 'react-test-renderer';
import 'react-native';

test('AddListForm renders correctly', () => {
  const snapshot = renderer.create(<AddListForm />).toJSON();
  expect(snapshot).toMatchSnapshot();
});