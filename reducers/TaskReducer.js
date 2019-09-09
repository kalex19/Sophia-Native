export const taskReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_TASKS":
      return action.tasks;
    case "ADD_TASK":
      return [...state, action.newTask];
    case "EDIT_TASK":
      state.forEach(task => {
        if (task.id === action.taskId) {
          task.name = action.nameToChange;
        }
      });
      return state
    case "DELETE_TASK":
      const filteredTasks = state.filter(task => task.id !== action.taskId);
      return filteredTasks;
    default:
      return state;
  }
};
