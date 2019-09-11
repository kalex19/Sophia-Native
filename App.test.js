import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import renderer from 'react-test-renderer';
import 'react-native';

jest.mock('react-native-gesture-handler', () => {})
jest.mock('react-navigation', () => {})
jest.mock('react-navigation-stack', () => {})
jest.mock('expo-asset', () => {})
jest.mock('expo-av', () => {})
jest.mock('expo-file-system', () => {})
jest.mock('expo-font', () => {})
jest.mock('expo-permissions', () => {})

describe('App', () => {
  let wrapper; 
  wrapper = shallow(<App />);

  // test('App renders correctly', () => {
  //   const snapshot = renderer.create(<App />).toJSON();
  //   expect(snapshot).toMatchSnapshot();
  // });

  it.skip('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

});