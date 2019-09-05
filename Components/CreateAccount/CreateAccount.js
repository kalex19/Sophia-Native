import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const initialState = {
user: '',
username: '',
password: '',
name: '',
address: '',
city: '',
state: '',
zip: '',
email: '',
phone: '',
needs: [],
allergies: [],
diet: [],
medications: [],
abilities: [],
}

export class CreateAccount extends Component {
  state = initialState;

	handleChange = (name, value) => {
    const multiResponseInputs = ['needs', 'allergies', 'diet', 'medications', 'abilities']
    if(multiResponseInputs.includes(name)){
      value = value.split(',')
    }
	  this.setState({
      [name]: value
	  })
	}

  handleClientSubmit = () => {
  const { username,
  password,
  name,
  address,
  city,
  state,
  zip,
  email,
  phone,
  needs,
  allergies,
  diet,
  medications } = this.state

  const newClientProfile = { 
    username,
    password,
    name,
    street_address: address,
    city,
    state,
    zip,
    email,
    phone_number: phone,
    needs,
    allergies,
    diet_restrictions: diet,
    medications
   }
  this.postClient(newClientProfile)
}

handleCaretakerSubmit = () => {
  const { username,
  password,
  name,
  email,
  phone,
  abilities } = this.state

  const newCaretakerProfile = { 
    username,
    password,
    name,
    email,
    phone_number: phone,
    abilities,
   }
  this.postCaretaker(newCaretakerProfile)
}

postClient = async (profile) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(profile)
    }
    try {
      const response = await fetch('/api/v1/clients/', options);
      const profile = await response.json();
    } catch (error) {
      throw new Error(`failed to post profile: ${error.message}`)
    }
    this.setState(initialState)
    this.props.navigation.navigate('ClientProfile')
}

postCaretaker = async (profile) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(profile)
  }
  try {
    const response = await fetch('/api/v1/caretakers/', options);
    const profile = await response.json();
  } catch (error) {
    throw new Error(`failed to post profile: ${error.message}`)
  }
  this.setState(initialState)
  this.props.navigation.navigate("CaretakerProfile")
}
  
  renderClientInput = () => {
    return (
			<View>
				<TextInput style={styles.input} placeholder="Street Address" onChangeText={value => this.handleChange('address', value)} />
				<TextInput style={styles.input} placeholder="City" onChangeText={value => this.handleChange('city', value)} />
				<TextInput style={styles.input} placeholder="State" onChangeText={value => this.handleChange('state', value)} />
				<TextInput style={styles.input} placeholder="Zip Code" onChangeText={value => this.handleChange('zip', value)} />
				<TextInput style={styles.input} placeholder="Caretaking Needs" onChangeText={value => this.handleChange('needs', value)} />
				<TextInput style={styles.input} placeholder="Allergies" onChangeText={value => this.handleChange('allergies', value)} />
				<TextInput style={styles.input} placeholder="Dietary Restrictions" onChangeText={value => this.handleChange('diet', value)} />
				<TextInput style={styles.input} placeholder="Medications" onChangeText={value => this.handleChange('medications', value)} />
			</View>
		);
  }

  renderCaretakerInput = () => {
    return <View>
      <TextInput style={styles.input} placeholder="Caretaking Abilities" onChangeText={value => this.handleChange('abilities', value)} />
    </View>
  };

  renderClientBtn = () => {
    return  <View style={styles.routes}>
    <TouchableHighlight
      underlayColor="black"
      accessibilityLabel="Tap me to create your client account."
      accessible={true}
      onPress={this.handleClientSubmit}>
      <Text style={styles.button}>Register as Client</Text>
    </TouchableHighlight>
  </View>
  }

  renderCaretakerBtn = () => {
    return <View style={styles.routes}>
    <TouchableHighlight
      underlayColor="black"
      accessibilityLabel="Tap me to create your caretaker account."
      accessible={true}
      onPress={this.handleCaretakerSubmit}>
      <Text style={styles.button}>Register as Caretaker</Text>
    </TouchableHighlight>
      </View>
  }

	render () {

		return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.header} accessibilityLabel="Fill in the inputs to create an account">
						Create Account
					</Text>
				</View>
				<ScrollView>
					<Text style={styles.text}>Are you a Client or Caretaker?</Text>
					<View style={styles.routes}>
						<TouchableHighlight
							underlayColor="black"
							accessibilityLabel="Tap me to create your client account."
							accessible={true}
							onPress={() => this.setState({ user: 'client' })}>
							<Text style={styles.button}>Client</Text>
						</TouchableHighlight>
					</View>
					<View style={styles.routes}>
						<TouchableHighlight
							underlayColor="black"
							accessibilityLabel="Tap me to create your caretaker account."
							accessible={true}
							onPress={() => this.setState({ user: 'caretaker' })}>
							<Text style={styles.button}>Caretaker</Text>
						</TouchableHighlight>
					</View>
          <TextInput style={styles.input} placeholder="Username" onChangeText={value => this.handleChange('username', value)} />
				<TextInput style={styles.input} placeholder="Password" onChangeText={value => this.handleChange('password', value)} />
				<TextInput style={styles.input} placeholder="Your Name" onChangeText={value => this.handleChange('name', value)} />
        <TextInput style={styles.input} placeholder="Email" onChangeText={value => this.handleChange('email', value)} />
				<TextInput style={styles.input} placeholder="Phone" onChangeText={value => this.handleChange('phone', value)} />
					{this.state.user === 'client' && this.renderClientInput()}
					{this.state.user === 'caretaker' && this.renderCaretakerInput()}
				</ScrollView>
        {this.state.user === 'client' && this.renderClientBtn()}
				{this.state.user === 'caretaker' && this.renderCaretakerBtn()}
			</View>
		);
	}
}

const mapDispatchToProps = dispatch => ({

});

export default connect(null, mapDispatchToProps)(CreateAccount);

const styles = StyleSheet.create({
	headerContainer: {
		borderBottomColor: 'maroon',
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: 40
	},
	header: {
		fontSize: 30,
		fontFamily: 'Didot'
  },
  container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	},
	routes: {
		flexDirection: 'column',
		backgroundColor: 'maroon',
		width: '80%',
    height: '30%',
    borderRadius: 30,
		justifyContent: 'space-around',
    margin: 5,

    fontSize: 30,
	},
	button: {
		color: 'white',
		fontSize: 25,
		fontFamily: 'Didot',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    fontSize: 20,
    fontFamily: 'Didot',
    padding: 2, 
    marginTop: 10,
  },
  text: {
		fontSize: 25,
		fontFamily: 'Didot',
		textAlign: 'center'
  }
	
});
