import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import renderer from 'react-test-renderer';
import 'react-native';

jest.mock('react-native-gesture-handler', () => {})
jest.mock('react-navigation', () => {})
jest.mock('react-navigation-stack', () => {})

describe('App', () => {
  let wrapper; 
  // wrapper = mount(<App />);

  test('App renders correctly', () => {
    const snapshot = renderer.create(<App />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  // it('should match the snapshot', () => {
  //   expect(mount).toMatchSnapshot();
  // });

});