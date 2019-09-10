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
  })
})