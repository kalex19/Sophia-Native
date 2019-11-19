import { taskReducer } from './taskReducer';

describe('taskReducer', () => {
  
  it('should return default state', () => {
    const expected = [];
    const result = taskReducer(undefined, []);
    
    expect(result).toEqual(expected);
  })

  it('should set task to state on LOAD_TASKS', () => {
    const tasks = [{ name: "apples" }]
    const actionObject = {
      type: 'LOAD_TASKS',
      tasks: tasks
    }

    const result = taskReducer(undefined, actionObject)

    expect(result).toEqual(tasks)
  });

  it('should clear the tasks on LOG_OUT', () => {
    const tasks = [{ name: "apples" }]
    const actionObject = {
      type: 'LOG_OUT',
      tasks: []
    }

    const result = taskReducer(tasks, actionObject)

    expect(result).toEqual([])
  });

  it('should toggle complete true and false on TOGGLE_COMPLETE', () => {
    let complete_initial = false;
    let complete_toggled = true;
    const actionObject = {
      type: 'TOGGLE_COMPLETE',
      complete: complete_toggled
    }

    const result = taskReducer(complete_initial, actionObject);

    expect(result).toEqual(complete_toggled)
  })
})