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

export const loadTasks = (listId, tasks) => ({
  type: "LOAD_TASKS",
  listId,
  tasks
})

export const addTask = newTask => ({
  type: "ADD_TASK",
  newTask
})

export const deleteTask = taskId => ({
  type: "DELETE_TASK",
  taskId
})

export const editTask = (nameToChange, taskId) => ({
  type: "EDIT_TASK",
  nameToChange,
  taskId
})