// export const patchTask = async (updatedTask, list_id, task_id, clientId) => {
// 	const options = {
// 		method: 'PATCH',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify(updatedTask)
// 	};

// 	const response = await fetch(
// 		`https://evening-dusk-50121.herokuapp.com/api/v1/lists/${list_id}/tasks/${task_id}`,
// 		options
// 	);
// 	if (!response.ok) {
// 		throw new Error('Could not edit the name of the task');
// 	}
// 	const task = await response.json();
// 	return task;
// };

export const patchTask = async (object, list_id, task_id) => {
	const url = `https://evening-dusk-50121.herokuapp.com/api/v1/lists/${list_id}/tasks/${task_id}`;
	const options = {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(object)
	};
	const response = await fetch(url, options);
	if (!response.ok) {
		throw new Error('Could not modify the task');
	}
	const task = await response.json();
	console.log('PATCHED TASK');
	return task;
};