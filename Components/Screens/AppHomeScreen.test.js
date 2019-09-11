import React from "react";
import { shallow } from "enzyme";
import { AppHomeScreen } from "./AppHomeScreen";
import "react-native";

jest.mock("react-native-gesture-handler", () => {
  return {}
});

let wrapper = shallow(<AppHomeScreen />)

test("AppHomeScreen renders correctly", () => {
  expect(wrapper).toMatchSnapshot();
});