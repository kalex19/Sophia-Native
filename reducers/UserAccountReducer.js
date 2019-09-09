export const userAccountReducer = (state = null, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'LOG_IN':
			return action.user;
		case 'LOG_OUT':
			return null;
		default:
			return state;
	}
}