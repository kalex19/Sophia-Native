export const taskReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_TASKS":
      return action.tasks;
    	case 'LOG_OUT':
      return [];
      case "TOGGLE_COMPLETE":
      return !action.bool
    default:
      return state;
  }
};
