export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_PROFILE":
      return action.profile;
    default:
      return state;
  }
};