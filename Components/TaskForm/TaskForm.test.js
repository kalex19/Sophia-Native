import React from 'react';
import TaskForm from '../TaskForm/TaskForm';
import renderer from 'react-test-renderer';
import 'react-native';

test('AddListForm renders correctly', () => {
  const snapshot = renderer.create(<TaskForm />).toJSON();
  expect(snapshot).toMatchSnapshot();
});