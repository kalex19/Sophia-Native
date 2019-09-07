const logInCaretaker = async (username, password) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username, password})
    };
    
    try {
      const response = await fetch('https://sophia-be.herokuapp.com/api/v1/login', options);
      const user = await response.json();
      this.props.logIn(user)
      this.setState(initialState);
      this.props.navigation.navigate('CaretakerProfile');
    } catch (error) {
      throw new Error(`failed to post profile: ${error.message}`);
    } 
  }
  
  export default logInCaretaker;