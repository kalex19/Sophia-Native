export const fetchAllLists = async (user, user_id) => {
	const response = await fetch(`https://evening-dusk-50121.herokuapp.com/api/v1/lists?${user}_id=${user_id}`);
	if (!response.ok) {
		throw new Error('Could not fetch lists');
	} else {
		const lists = response.json();
		return lists;
	}
};
