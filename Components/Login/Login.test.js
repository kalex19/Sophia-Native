import React from "react";
import { shallow } from "enzyme";
import { Login } from "./Login";
import "react-native";
import { mapStateToProps, mapDispatchToProps } from "./Login";
import { logIn } from "../../actions";

jest.mock("react-native-gesture-handler", () => {
  return {}
});

let mockHandleChange = jest.fn()
let mockHandleSubmit = jest.fn()
let mockLoginUser = jest.fn()
let mockLogIn = jest.fn()

let wrapper = shallow(<Login 
userAccount = {{}}
handleChange={mockHandleChange}
handleSubmit={mockHandleSubmit}
logInUser={mockLoginUser}
logIn={mockLogIn}
/>)

test("Login renders correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("change the state of every element of the initial state when handleChange is invoked", () => {
  wrapper.state.accountType = '';
  let mockValue = "changed"

  let mockName = "accountType"

  wrapper.instance().handleChange(mockName, mockValue)

  expect(wrapper.state('accountType')).toEqual(mockValue)
});

it.skip("should return a user object", () => {
  const initialState = {}

  let mappedProps = mapStateToProps(initialState);

  expect(mappedProps).toEqual(initialState);
});

it("calls dispatch with a logIn action when logIn is called", () => {
  let initialState = {
    userAccount: {}
  };

  const mockDispatch = jest.fn();
  const mockAction = logIn(initialState.userAccount);

  const mappedProps = mapDispatchToProps(mockDispatch);
  mappedProps.logIn(initialState.userAccount);

  expect(mockDispatch).toHaveBeenCalledWith(mockAction);
});

it("should set the error state to an empty string when handleSubmit is called", () => {
  wrapper.state.error = 'error';

  wrapper.instance().handleSubmit();

  expect(wrapper.state('error')).toEqual('');
});

it("should set the message state to a string that asks the user to type a username and password", () => {
  wrapper.state.message = '';
  wrapper.state.username = '';
  wrapper.state.password = '';
  let mockMessage = "Please type in a username and password"

  wrapper.instance().handleSubmit();

  expect(wrapper.state('message')).toEqual(mockMessage);
});