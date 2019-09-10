export const getCaretakers = async () => {  
  try {
    const response = await fetch('https://sophia-be.herokuapp.com/api/v1/caretakers/');
    return await response.json();
  } catch (error) {
    throw new Error(`failed to post profile: ${error.message}`);
  }
};