import React from 'react';
import { shallow } from 'enzyme';
import IndividualList from './IndividualList';
import renderer from 'react-test-renderer';
import 'react-native';
import { loadTasks } from "../../actions";
import { mapStateToProps, mapDispatchToProps } from "./IndividualList";

// test('IndividuaList renders correctly', () => {
//   const snapshot = renderer.create(<IndividualList />).toJSON();
//   expect(snapshot).toMatchSnapshot();
// });

describe('IndividualList', () => {
  let wrapper; 

  let mockTasks = [{name: "apples", description: "Fuji", due_date: "09/09"}]

  window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTasks)
    });
  });

  beforeEach(() => {
    let mockLoadTasks = jest.fn();
    let mockClientId = 1;
    let mockReturnUpdatedTask = jest.fn()
    let mockToggleEditName = jest.fn()
    let mockHandleChangeTask = jest.fn()
    let mockHandleChangeNote = jest.fn()
    let mockHandleChangeDate = jest.fn()
    let mockHandleEditTask = jest.fn()
    let mockHandleSubmitEdit = jest.fn()
    let mockHandleSubmit = jest.fn()
    let mockEraseTask = jest.fn()
    let initialState = { tasks: [] }

    wrapper = shallow(
    <IndividualList 
    tasks = {mockTasks}
    loadTasks = {mockLoadTasks}
    client_id = {mockClientId}
    returnUpdatedTask = {mockReturnUpdatedTask}
    toggleEditName = {mockToggleEditName}
    handleChangeTask = {mockHandleChangeTask}
    handleChangeNote = {mockHandleChangeNote}
    handleChangeDate = {mockHandleChangeDate}
    handleEditTask = {mockHandleEditTask}
    handleSubmitEdit = {mockHandleSubmitEdit}
    handleSubmitEdit = {mockHandleSubmit}
    eraseTask = {mockEraseTask}
    initialState = {initialState}
    />)
  });

  it('should match the snapshot', () => {
    console.log(wrapper)
    expect(wrapper).toMatchSnapshot();
  });

});
