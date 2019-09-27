export const taskReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_TASKS":
      action.tasks.sort((a, b) => {
        let nameA = a.created_at;
        let nameB = b.created_at;
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }).reverse()
      return action.tasks;
    	case 'LOG_OUT':
      return [];
      case "TOGGLE_COMPLETE":
      return !action.bool
    default:
      return state;
  }
};
