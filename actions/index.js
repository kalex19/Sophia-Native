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

// export const logOut = () => ({
//   type:'LOG_OUT'
// })

// export const isLoading = (bool) => ({
//       type: 'IS_LOADING',
//       isLoading: bool
//   })

// export const hasErrored = (error) => ({
//       type: 'HAS_ERRORED',
//       error
//   })

//get to these later, if time.

