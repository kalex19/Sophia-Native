export const logInUser = async (username, password) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({username, password})
  };
  try {
    const response = await fetch('https://sophia-be.herokuapp.com/api/v1/login', options);
    return await response.json();
  } catch (error) {
    throw new Error(`failed to post profile: ${error.message}`);
  } 
}

