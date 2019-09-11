import React from 'react';
import { CreateAccount } from './CreateAccount';
import { shallow } from 'enzyme';
import 'react-native';
import { mapStateToProps, mapDispatchToProps } from "./CreateAccount";
import { logIn } from '../../actions'

jest.mock("react-native-gesture-handler", () => {
  return {}
});

global.fetch = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockUser)
  });
});

let wrapper = shallow(<CreateAccount />)

test("CreateAccount renders correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

it("should return a userAccount object", () => {
  const initialState = {}

  let mappedProps = mapStateToProps(initialState);

  expect(mappedProps).toEqual(initialState);
});

it("calls dispatch with an object when logIn action is called", () => {
  let initialState = {
    logIn: {}
  };

  const mockDispatch = jest.fn();
  const mockAction = logIn(initialState.userAccount);

  const mappedProps = mapDispatchToProps(mockDispatch);
  mappedProps.logIn(initialState.lists);

  expect(mockDispatch).toHaveBeenCalledWith(mockAction);
});