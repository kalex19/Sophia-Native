export const listsReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_LISTS":
      return [...state, ...action.lists];
    // case "LOG_OUT":
    //   return [];
    default:
      return state;
  }
};
