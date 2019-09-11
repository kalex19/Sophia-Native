import React from "react";
import { CreateAccount } from "./CreateAccount";
import { shallow } from "enzyme";
import "react-native";
import { mapStateToProps, mapDispatchToProps } from "./CreateAccount";
import { logIn } from "../../actions";

jest.mock("react-native-gesture-handler", () => {
  return {};
});

jest.mock("../../Utils/apiCalls", () => ({
  postClient: jest.fn().mockImplementation(() => {
    return {
      id: 1,
      name: "mockUser"
    };
  })
}));

global.fetch = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockUser)
  });
});

let mockPostClient = jest.fn()
let mockLogIn = jest.fn()

let wrapper = shallow(<CreateAccount 
postClient = {mockPostClient}
logIn={mockLogIn}
navigation={{ navigate: jest.fn() }}
/>);

test("CreateAccount renders correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

it("should return a userAccount object", () => {
  const initialState = {};

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

test("change the state of every element of the initial state when handleChange is invoked", () => {
  wrapper.state.name = "";
  let mockValue = "changed";

  let mockName = "name";

  wrapper.instance().handleChange(mockName, mockValue);

  expect(wrapper.state("name")).toEqual(mockValue);
});

it("should set the message state to a string that asks the user to type in all the input fields when handleClientSubmit is invoked", () => {
  wrapper.state.message = "";
  wrapper.state.username = "filled"
  wrapper.state.password = "filled"
  wrapper.state.password_confirmation = "filled"
  wrapper.state.name = ""
  wrapper.state.email = "filled"
  wrapper.state.phone = "filled"
  wrapper.state.address = "filled"
  wrapper.state.state = "filled"
  wrapper.state.city = "filled"
  wrapper.state.zip = "filled"
  wrapper.state.needs = "filled"
  wrapper.state.allergies = "filled"
  wrapper.state.diet = "filled"
  wrapper.state.medications = "filled"
  let mockMessage = "Please fill out all input fields";

  wrapper.instance().handleClientSubmit();

  expect(wrapper.state("message")).toEqual(mockMessage);
});



