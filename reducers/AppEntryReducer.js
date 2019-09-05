export default appEntryReducer = (state = false, action) => {
	switch (action.type) {
		case 'TOGGLE_LOGIN': 
      return action.bool
		default:
			return state;
	}
};
