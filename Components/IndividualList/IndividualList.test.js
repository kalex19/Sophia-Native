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
    handleSubmit = {mockHandleSubmit}
    eraseTask = {mockEraseTask}
    initialState = {initialState}
    store={store}
    />)
  });

  it.skip('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should set state of displayEdit to the value of task_id when toggleEditName is called', () => {
    console.log(wrapper)
    let mockId = 1
    wrapper.state.displayEdit = ''

    wrapper.instance().toggleEditName(mockId);

    expect(wrapper.state('displayEdit')).toEqual(1)
  })

});
