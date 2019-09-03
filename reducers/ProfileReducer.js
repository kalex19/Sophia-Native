const test = { test: "test"}

export const profileReducer = (state = test, action) => {
  switch (action.type) {
    case "LOAD_PROFILE":
      return action.profile;
    default:
      return state;
  }
};