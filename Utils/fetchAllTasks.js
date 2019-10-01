export const fetchAllTasks = async (list_id) => {
	const response = await fetch(`https://evening-dusk-50121.herokuapp.com/api/v1/lists/${list_id}/tasks`);
	if (!response.ok) {
		throw new Error('Could not fetch tasks');
	} else {
		const lists = response.json();
		return lists;
	}
};