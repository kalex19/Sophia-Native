export const loadProfile = profile => ({
  type: "LOAD_PROFILE",
  profile
})

export const loadLists = lists => ({
  type: "LOAD_LISTS",
  lists
})

export const logIn = (user) => ({
  type:'LOG_IN',
  user
})

export const loadTasks = tasks => ({
  type: "LOAD_TASKS",
  tasks
})

export const logOut = () => ({
  type:'LOG_OUT'
})

export const togglecomplete = (bool) => ({
  type: "TOGGLE_COMPLETE",
  bool
})

// export const isLoading = (bool) => ({
//       type: 'IS_LOADING',
//       bool
//   })

// export const hasErrored = (error) => ({
//       type: 'HAS_ERRORED',
//       error
//   })
