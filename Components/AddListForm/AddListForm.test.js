import React from 'react';
import { AddListForm } from './AddListForm';
import { shallow } from 'enzyme';
import { mapStateToProps, mapDispatchToProps } from './AddListForm';
import { addList } from '../../actions';
import { postList } from '../../Utils/clientApiCalls';


jest.mock("react-native-gesture-handler", () => {
  return {};
});
jest.mock("expo-av", () => {
  return {};
});
jest.mock("expo-file-system", () => {
  return {};
});
jest.mock("expo-font", () => {
  return {};
});
jest.mock("expo-permissions", () => {
  return {};
});

global.fetch = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockUser)
  });
});

let mockHandleChange = jest.fn();
let mockHandleEditList = jest.fn();
let mockHandleSubmit = jest.fn();
let mockHandleValueChange = jest.fn();
let mockCreateNewList = jest.fn();
let mockPostList = jest.fn();
let wrapper = shallow(<AddListForm 
handleChange = {mockHandleChange}
handleEditList = {mockHandleEditList}
handleSubmit = {mockHandleSubmit}
handleValueChange = {mockHandleValueChange}
createNewList = {mockCreateNewList}
user = {{ role: "client", id: 3}}
/>)

test("AddListForm renders correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

it("should change the state of the list_title when handleChange is invoked", () => {
  wrapper.state.list_title = "";

  let mockName = "new list name";

  wrapper.instance().handleChange(mockName);

  expect(wrapper.state("list_title")).toEqual(mockName);
});

it("should change the state of list_edit_input when handleEditList is invoked", () => {
  wrapper.state.list_edit_input = "";

  let mockName = "new edit input";

  wrapper.instance().handleEditList(mockName);

  expect(wrapper.state("list_edit_input")).toEqual(mockName);
});

it('should call postList when handleSubmit is invoked', () => {
  wrapper.instance().handleSubmit();

  expect(wrapper.postList).toHaveBeenCalled;
})

it('should navigate to set state to list_title: "", caretaker_id: 0, client_id: 0  when handleSubmit is invoked', async () => {
  
  wrapper.state.list_title = "Sample list title"
  wrapper.state.caretaker_id = 1
  wrapper.state.client_id = 1
  await wrapper.instance().handleSubmit();
  expect(wrapper.state('caretaker_id')).toEqual(0);
  expect(wrapper.state('client_id')).toEqual(0);
})

it('should set the state to the user ids for a client or a caretaker', () => {
  let mockUserId = 2;

  wrapper.instance().handleValueChange(mockUserId);

  expect(wrapper.state('caretaker_id')).toEqual(2);
  expect(wrapper.state('client_id')).toEqual(3)
})

describe('mapStateToProps', () => {
  let initialState = {
    lists: [
      {title: 'Hat'},
      {title: 'Hat 2'}
    ],
    user: undefined,
  };

  it('should return a user and an array of lists', () => {
    const mappedProps = mapStateToProps(initialState);
    expect(mappedProps).toEqual(initialState);
  });
});

describe('mapDispatchToProps', () => {
  let initialState = {
    user: "User",
    lists: [
      {title: 'Hat'},
      {title: 'Hat 2'}
    ]
    };
  
    it('calls dispatch with a addList action when addList is called', () => {
      const mockDispatch = jest.fn();
      const newList = { title: 'Hat 3' }
      const mockAction = addList(newList);
  
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addList(newList);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });
