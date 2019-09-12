import React from "react";
import { shallow } from "enzyme";
import { UserHomeScreen } from "./UserHomeScreen";
import "react-native";
import { mapStateToProps, mapDispatchToProps } from "./UserHomeScreen";
import { loadLists } from "../../actions";

jest.mock("react-native-gesture-handler", () => {
  return {}
});

let wrapper = shallow(<UserHomeScreen 
user = { {name: "Test Name"} }
/>)

test("UserHomeScreen renders correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

it("should return a userAccount object", () => {
  const initialState = {}

  let mappedProps = mapStateToProps(initialState);

  expect(mappedProps).toEqual(initialState);
});

it("calls dispatch with an array of lists when loadList action is called", () => {
  let initialState = {
    lists: []
  };

  const mockDispatch = jest.fn();
  const mockAction = loadLists(initialState.lists);

  const mappedProps = mapDispatchToProps(mockDispatch);
  mappedProps.loadLists(initialState.lists);

  expect(mockDispatch).toHaveBeenCalledWith(mockAction);
});