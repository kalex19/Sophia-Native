export const userAccountReducer = (state = null, action) => {
	switch(action.type) {
		case 'LOG_IN':
			console.log("HIHIHIHI", action)
			return action.user;
		case 'LOG_OUT':
			return null;
		default:
			return state;
	}
}