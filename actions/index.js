export const loadProfile = profile => ({
  type: "LOAD_PROFILE",
  profile
})

export const loadLists = lists => ({
  type: "LOAD_LISTS",
  lists
})

export const addList = newList => ({
  type: "ADD_LIST",
  newList
})

export const deleteList = listId => ({
  type: "DELETE_LIST",
  listId
})