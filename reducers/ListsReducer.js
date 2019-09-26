export const listsReducer = (state = [], action) => {
	switch (action.type) {
		case 'LOAD_LISTS':
			return action.lists;
		case 'ADD_LIST':
			return [...state, action.list];
		case 'LOG_OUT':
			return [];
		default:
			return state;
	}
};
