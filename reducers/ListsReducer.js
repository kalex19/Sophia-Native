export const listsReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_LISTS":
      return action.lists;
    case "EDIT_LIST":
      state.forEach(list => {
        if (list.id === action.listId) {
          list.name = action.nameToChange;
        }
      });
      return state;
    default:
      return state;
  }
};
