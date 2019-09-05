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
    diet,
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
  
  this.setState(initialState)
}

postCaretaker = async (profile) => {
  this.setState(initialState)
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
        <View style={styles.routes}>
       <TouchableHighlight
         underlayColor="black"
         accessibilityLabel="Tap me to create your client account."
         accessible={true}
         onPress={this.handleClientSubmit}>
         <Text style={styles.button}>Register as Client</Text>
       </TouchableHighlight>
     </View>
			</View>
		);
  }

  renderCaretakerInput = () => {
    return <View>
      <TextInput style={styles.input} placeholder="Caretaking Abilities" onChangeText={value => this.handleChange('abilities', value)} />
        <View style={styles.routes}>
      <TouchableHighlight
        underlayColor="black"
        accessibilityLabel="Tap me to create your caretaker account."
        accessible={true}
        onPress={this.handleCaretakerSubmit}>
        <Text style={styles.button}>Register as Caretaker</Text>
      </TouchableHighlight>
    </View>
    </View>
  };

	render () {

		return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.header} accessibilityLabel="Fill in the inputs to create an account">
						Create Account
					</Text>
				</View>
				<ScrollView>
					<Text>Are you a Client or Caretaker?</Text>
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
			</View>
		);
	}
}

const mapDispatchToProps = dispatch => {

};

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
	greeting: {
		fontSize: 30,
		fontFamily: 'Didot',
		margin: 10,
		marginBottom: 30
	},
	button: {
		color: 'white',
		fontSize: 25,
		fontFamily: 'Didot',
		textAlign: 'center'
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
		height: '20%',
		justifyContent: 'space-around',
		margin: 10
	}
});
