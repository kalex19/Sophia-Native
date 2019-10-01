import React from "react";
import { shallow } from "enzyme";
import { Task } from "./Task";
import "react-native";
import { loadTasks } from "../../actions";
import { mapStateToProps, mapDispatchToProps } from "./Task";
import { fetchTasks, postTask, patchTask, deleteTask } from '../../Utils/clientApicalls';


// jest.mock("../../Utils/apiCalls", () => ({
//   fetchTasks: jest.fn().mockImplementation(() => {
//     return [
//       {
//         id: 1,
//         name: "Mock Task",
//         description: "mock note",
//         completed: "false",
//         due_date: "mock date"
//       }
//     ];
//   }),
//   postTask: jest.fn().mockImplementation(() => {
//     return {
//       id: 1,
//       name: "task_uno",
//       description: "description of the first task",
//       completed: "false",
//       due_date: "2018-12-08"
//     };
//   }),
//   deleteTask: jest.fn(),
//   patchTask: jest.fn().mockImplementation(() => {
//     return {
//       id: 1,
//       name: "updated name",
//       description: "description of the first task",
//       completed: "false",
//       due_date: "date_time"
//     };
//   })
// }));

jest.mock("react-native-gesture-handler", () => {
  return {}
});

global.fetch = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockTasks)
  });
});

let mockToggleEditName = jest.fn();
let mockLoadTasks = jest.fn();
let mockClientId = 1;
let mockListId = 1;
let mockTaskId = 1;
let mockReturnUpdatedTask = jest.fn();
let mockHandleChangeTask = jest.fn();
let mockHandleChangeNote = jest.fn();
let mockHandleChangeDate = jest.fn();
let mockHandleEditTask = jest.fn();
let mockHandleSubmitEdit = jest.fn();
let mockHandleSubmit = jest.fn();
let mockEraseTask = jest.fn();
let mockFetchTasks = jest.fn();
let mockReturnCaretakerTasks = jest.fn()
let wrapper = shallow(
  <Tasks
    navigation={{ state: { params: { name: "list", client_id: 1, id: 1 } } }}
    tasks={[]}
    toggleEditName={mockToggleEditName}
    handleChangeTask={mockHandleChangeTask}
    handleChangeNote={mockHandleChangeNote}
    handleChangeDate={mockHandleChangeDate}
    handleEditTask={mockHandleEditTask}
    returnUpdatedTask={mockReturnUpdatedTask}
    handleSubmitEdit={mockHandleSubmitEdit}
    handleSubmit={mockHandleSubmit}
    eraseTask={mockEraseTask}
    fetchTasks={mockFetchTasks}
    returnCareTakerTasks={mockReturnCaretakerTasks}
    user={{role: "client"}}
  />
);

test("Tasks renders correctly", () => {
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

test.skip("should return a new or updated task when returnUpdatedTask is invoked", () => {
  wrapper.instance().returnUpdatedTask();

  expect(mockLoadTasks).toHaveBeenCalled();
});

test.skip("should call patchTask when handleSubmitEdit is called", () => {
  wrapper.instance().handleSubmitEdit(mockTaskId);

  expect(patchTask).toHaveBeenCalled();
});

test.skip("should call returnUpdatedTask when handleSubmitEdit is called", () => {
  wrapper.instance().handleSubmitEdit(mockTaskId);

  expect(mockReturnUpdatedTask).toHaveBeenCalled();
});

test.skip("should set the state of task_edit_input to '' and displayEdit to 'false' when handleSubmitEdit is called", () => {
  wrapper.state.task_edit_input = "buy oranges";
  wrapper.state.displayEdit = true;

  wrapper.instance().handleSubmitEdit(mockTaskId);

  expect(wrapper.state("task_edit_input")).toEqual("");
  expect(wrapper.state("displayEdit")).toEqual(false);
});

test.skip("should call postTask when handleSubmit is called", () => {
  let mockNewTask = { name: "buy icecream" };

  wrapper.instance().handleSubmit(mockNewTask);

  expect(postTask).toHaveBeenCalled();
});

test.skip("should call deleteTask when eraseTask is called", () => {
  wrapper.instance().eraseTask(mockTaskId);

  expect(deleteTask).toHaveBeenCalled();
});

it("calls dispatch with a loadTasks action when loadTasks is called", () => {
  let initialState = {
    tasks: []
  };

  const mockDispatch = jest.fn();
  const mockAction = loadTasks(initialState.tasks);

  const mappedProps = mapDispatchToProps(mockDispatch);
  mappedProps.loadTasks(initialState.tasks);

  expect(mockDispatch).toHaveBeenCalledWith(mockAction);
});
