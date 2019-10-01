export const patchCaretakerProfile = async updatedProfile => {
	const options = {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(updatedProfile)
	};
	const response = await fetch(
		`https://evening-dusk-50121.herokuapp.com/api/v1/caretakers/${updatedProfile.caretaker_id}`,
		options
	);

	if (!response.ok) {
		throw new Error('Could not edit the caretaker profile');
	}
	const profile = await response.json();
	return profile;
};
