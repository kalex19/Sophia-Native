import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import renderer from 'react-test-renderer';
import 'react-native';

describe('App', () => {
  let wrapper; 
  wrapper = mount(<App />);

  it('should match the snapshot', () => {
    expect(mount).toMatchSnapshot();
  });

});