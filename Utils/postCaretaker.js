
export const postCaretaker = async profile => {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(profile)
    };
    
		try {
			const response = await fetch('https://evening-dusk-50121.herokuapp.com/api/v1/caretakers/', options);
      return await response.json();
		} catch (error) {
			throw new Error(`failed to post profile: ${error.message}`);
		}
  };
