import React from "react";
import { shallow } from "enzyme";
import { IndividualList } from "./IndividualList";
import renderer from "react-test-renderer";
import "react-native";
import { loadTasks } from "../../actions";
import { mapStateToProps, mapDispatchToProps } from "./IndividualList";

jest.mock("react-native-gesture-handler", () => {
  return {};
});

let mockToggleEditName = jest.fn();
let mockLoadTasks = jest.fn();
let mockClientId = 1;
let mockReturnUpdatedTask = jest.fn()
let mockHandleChangeTask = jest.fn()
let mockHandleChangeNote = jest.fn()
let mockHandleChangeDate = jest.fn()
let mockHandleEditTask = jest.fn()
let mockHandleSubmitEdit = jest.fn()
let mockHandleSubmit = jest.fn()
let mockEraseTask = jest.fn()
let initialState = { tasks: [] }
let wrapper = shallow(
  <IndividualList
    navigation={{ state: { params: { name: "list" } } }}
    tasks={[]}
    toggleEditName={mockToggleEditName}
    handleChangeTask={mockHandleChangeTask}
    handleChangeNote={mockHandleChangeNote}
  />
);



test("IndividuaList renders correctly", () => {
  expect(wrapper).toMatchSnapshot();
});


test("should set state of displayEdit to the task id when toggleEditName is invoked", () => {
  let mockTaskId = 1;

  wrapper.state.displayEdit = "";
  wrapper.instance().toggleEditName(mockTaskId);

  expect(wrapper.state("displayEdit")).toEqual(1);
});

test("should set state of task_input to the task id when handleChangeTask is invoked", () => {
  let mockInput = "buy apples";

  wrapper.state.task_input = "";
  wrapper.instance().handleChangeTask(mockInput);

  expect(wrapper.state("task_input")).toEqual(mockInput);
});

test("should set state of description_input to the task id when handleChangeNote is invoked", () => {
  let mockInput = "Fuji";

  wrapper.state.description_input = "";
  wrapper.instance().handleChangeNote(mockInput);

  expect(wrapper.state("description_input")).toEqual(mockInput);
});

test("should set state of due_date to the task id when handleChangeDate is invoked", () => {
  let mockInput = "09/09";

  wrapper.state.due_date = "";
  wrapper.instance().handleChangeDate(mockInput);

  expect(wrapper.state("due_date")).toEqual(mockInput);
});

test("should set state of task_edit_input to the task id when handleEditTask is invoked", () => {
  let mockInput = "buy oranges";

  wrapper.state.task_input = "";
  wrapper.instance().handleEditTask(mockInput);

  expect(wrapper.state("task_edit_input")).toEqual(mockInput);
});


//   })

// })

// describe('IndividualList', () => {
//   let wrapper;

//   let mockTasks = [{name: "apples", description: "Fuji", due_date: "09/09"}]

//   window.fetch = jest.fn().mockImplementation(() => {
//     return Promise.resolve({
//       ok: true,
//       json: () => Promise.resolve(mockTasks)
//     });
//   });

//   beforeEach(() => {
//     let mockLoadTasks = jest.fn();
//     let mockClientId = 1;
//     let mockReturnUpdatedTask = jest.fn()
//     let mockToggleEditName = jest.fn()
//     let mockHandleChangeTask = jest.fn()
//     let mockHandleChangeNote = jest.fn()
//     let mockHandleChangeDate = jest.fn()
//     let mockHandleEditTask = jest.fn()
//     let mockHandleSubmitEdit = jest.fn()
//     let mockHandleSubmit = jest.fn()
//     let mockEraseTask = jest.fn()
//     let initialState = { tasks: [] }

//     wrapper = shallow(
//     <IndividualList
//     tasks = {mockTasks}
//     loadTasks = {mockLoadTasks}
//     client_id = {mockClientId}
//     returnUpdatedTask = {mockReturnUpdatedTask}
//     toggleEditName = {mockToggleEditName}
//     handleChangeTask = {mockHandleChangeTask}
//     handleChangeNote = {mockHandleChangeNote}
//     handleChangeDate = {mockHandleChangeDate}
//     handleEditTask = {mockHandleEditTask}
//     handleSubmitEdit = {mockHandleSubmitEdit}
//     handleSubmit = {mockHandleSubmit}
//     eraseTask = {mockEraseTask}
//     initialState = {initialState}
//     store={store}
//     />)
//   });

//   it.skip('should match the snapshot', () => {
//     expect(wrapper).toMatchSnapshot();
//   });

//   it('should set state of displayEdit to the value of task_id when toggleEditName is called', () => {
//     console.log(wrapper)
//     let mockId = 1
//     wrapper.state.displayEdit = ''

//     wrapper.instance().toggleEditName(mockId);

//     expect(wrapper.state('displayEdit')).toEqual(1)
//   })

// });
