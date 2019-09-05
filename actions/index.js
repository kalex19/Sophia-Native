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

export const createClientAccount = newClientProfile => ({
  type: "CREATE_CLIENT_ACCOUNT",
  newClientProfile
})

export const createCaretakerAccount = newCaretakerProfile => ({
  type: "CREATE_CARETAKER_ACCOUNT",
  newCaretakerProfile
})

export const logIn = (user) => ({
  type:'LOG_IN',
  user
})

export const logOut = () => ({
  type:'LOG_OUT'
})

export const toggleLogIn = (bool) => ({
  type: "TOGGLE_LOGIN",
  bool
})


//may need to have log in and log out for clients and caretakers 

// export const isLoading = (bool) => ({
//       type: 'IS_LOADING',
//       isLoading: bool
//   })

// export const hasErrored = (error) => ({
//       type: 'HAS_ERRORED',
//       error
//   })

//get to these later, if time.