export const taskReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_TASKS":
      return action.items;
    case "ADD_TASK":
      return [ ...state, action.newTask ];
    case "DELETE_TASK":
      const filteredTasks = state.filter(task => task.id !== action.taskId)
      return filteredTasks 
    default:
      return state;
  }
};