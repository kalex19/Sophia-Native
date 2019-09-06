export const listsReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_LISTS":
      return action.lists;
    case "ADD_LIST":
      return [...state, action.newList];
    case "EDIT_LIST":
      state.forEach(list => {
        if (list.id === action.listId) {
          list.name = action.nameToChange;
        }
      });
      return state;
    case "DELETE_LIST":
      const filteredLists = state.filter(list => list.id !== action.listId);
      return filteredLists;
    default:
      return state;
  }
};
