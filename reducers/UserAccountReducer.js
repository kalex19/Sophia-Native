export const userAccountReducer = (state = null, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'LOG_IN':
			return payload.user;
		case 'LOG_OUT':
			return null;
		default:
			return state;
	}
}