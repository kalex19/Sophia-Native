import logInUser from './logInUser';

export default postCaretaker = async profile => {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(profile)
    };
    
		try {
			const response = await fetch('https://sophia-be.herokuapp.com/api/v1/caretakers/', options);
      const account = await response.json();
      await logInUser(account.username, account.password)
		} catch (error) {
			throw new Error(`failed to post profile: ${error.message}`);
		}
  };
