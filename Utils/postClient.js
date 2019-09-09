import logInUser from './logInUser';

export default postClient = async profile => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile)
  };
  try {
    const response = await fetch('https://sophia-be.herokuapp.com/api/v1/clients/', options);
    const account = await response.json();
    let user = await logInUser(account.username, account.password)
    this.props.logIn(user)
    console.log('store', this.props.user)
    this.setState(initialState);
    this.props.navigation.navigate('UserHomeScreen', user);
  } catch (error) {
    throw new Error(`failed to post profile: ${error.message}`);
  }
};