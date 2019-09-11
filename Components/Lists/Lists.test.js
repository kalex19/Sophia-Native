import React from 'react';
import { Lists } from './Lists';
import { shallow } from 'enzyme';
import 'react-native';
import { mapStateToProps, mapDispatchToProps } from "./Lists";
import { fetchLists, postList, patchList, deleteList } from '../../Utils/apicalls';

jest.mock("react-native-gesture-handler", () => {
  return {}
});

jest.mock("expo-av", () => {
  return {}
});

jest.mock("expo-file-system", () => {
  return {}
});
jest.mock("expo-font", () => {
  return {}
});
jest.mock("expo-permissions", () => {
  return {}
});

global.fetch = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockLists)
  });
});

let wrapper = shallow(<Lists />)

test("Lists renders correctly", () => {
  expect(wrapper).toMatchSnapshot();
});