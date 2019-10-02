export const listsReducer = (state = [], action) => {
	switch (action.type) {
		case 'LOAD_LISTS':
				action.lists.sort((a, b) => {
					let nameA = a.created_at;
					let nameB = b.created_at;
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				}).reverse()
			return action.lists;
		case 'ADD_LIST':
			const newState = [...state, action.list]
			newState.sort((a, b) => {
				let nameA = a.created_at;
				let nameB = b.created_at;
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			}).reverse()
			return newState;
		case 'LOG_OUT':
			return [];
		default:
			return state;
	}
};
