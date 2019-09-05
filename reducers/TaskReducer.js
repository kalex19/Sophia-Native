export const taskReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_TASKS":
      return action.items;
    case "ADD_TASK":
        return [ ...state, action.newTask ];
    default:
      return state;
  }
};