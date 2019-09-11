export const taskReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_TASKS":
      return action.tasks;
    	case 'LOG_OUT':
			return [];
    default:
      return state;
  }
};
