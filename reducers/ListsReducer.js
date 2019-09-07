export const listsReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_LISTS":
      return action.lists;
    default:
      return state;
  }
};
