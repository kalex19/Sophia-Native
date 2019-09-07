import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	KeyboardAvoidingView,
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import theme from '../../theme';
// import { PropTypes } from 'prop-types';
import { logIn } from '../../actions';
import { logInClient} from '../../Utils/loginClient';
import { logInCaretaker} from '../../Utils/loginCaretaker';

const initialState = {
	user: '',
	username: '',
	password: '',
	password_confirmation: '',
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
	abilities: []
};

export class CreateAccount extends Component {
	state = initialState;

	handleChange = (name, value) => {
		const multiResponseInputs = [ 'needs', 'allergies', 'diet', 'medications', 'abilities' ];
		if (multiResponseInputs.includes(name)) {
			value = value.split(',');
		}
		this.setState({
			[name]: value
		});
	};

	handleClientSubmit = () => {
		const {
			username,
			password,
			password_confirmation,
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
			medications
		} = this.state;

		const newClientProfile = {
			username,
			password,
			password_confirmation,
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
		};
		this.postClient(newClientProfile)
	};

	handleCaretakerSubmit = () => {
		const { username, password, password_confirmation, name, email, phone, abilities } = this.state;

		const newCaretakerProfile = {
			username,
			password,
			password_confirmation,
			name,
			email,
			phone_number: phone,
			abilities
		};
		// this.postCaretaker(newCaretakerProfile)
	};

	postClient = async profile => {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(profile)
		};
		try {
			const response = await fetch('https://sophia-be.herokuapp.com/api/v1/clients/', options);
			const account = await response.json();
			// await logInClient(account.username, account.password)
			// console.log(user)
			// this.props.logIn(user)
				this.setState(initialState);
    	this.props.navigation.navigate('ClientProfile');
		} catch (error) {
      throw new Error(`failed to post profile: ${error.message}`);
		}
	};

	postCaretaker = async profile => {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(profile)
    };
    
		try {
			const response = await fetch('https://sophia-be.herokuapp.com/api/v1/caretakers/', options);
      const account = await response.json();
      await logInCaretaker(account.username, account.password)
		} catch (error) {
			throw new Error(`failed to post profile: ${error.message}`);
		}
  };
  

	renderClientInput = () => {
		return (
			<View>
				<TextInput
					style={styles.input}
					placeholder="Street Address"
					onChangeText={value => this.handleChange('address', value)}
					placeholderTextColor={theme.primary}
				/>
				<TextInput
					style={styles.input}
					placeholder="City"
					onChangeText={value => this.handleChange('city', value)}
					placeholderTextColor={theme.primary}
				/>
				<TextInput
					style={styles.input}
					placeholder="State"
					onChangeText={value => this.handleChange('state', value)}
					placeholderTextColor={theme.primary}
				/>
				<TextInput
					style={styles.input}
					placeholder="Zip Code"
					onChangeText={value => this.handleChange('zip', value)}
					placeholderTextColor={theme.primary}
				/>
				<Text style={styles.text}>Seperate multiple input values by commas</Text>
				<TextInput
					style={styles.input}
					placeholder="Caretaking Needs"
					onChangeText={value => this.handleChange('needs', value)}
					placeholderTextColor={theme.primary}
				/>
				<TextInput
					style={styles.input}
					placeholder="Allergies"
					onChangeText={value => this.handleChange('allergies', value)}
					placeholderTextColor={theme.primary}
				/>
				<TextInput
					style={styles.input}
					placeholder="Dietary Restrictions"
					onChangeText={value => this.handleChange('diet', value)}
					placeholderTextColor={theme.primary}
				/>
				<TextInput
					style={styles.input}
					placeholder="Medications"
					onChangeText={value => this.handleChange('medications', value)}
					placeholderTextColor={theme.primary}
				/>
			</View>
		);
	};

	renderCaretakerInput = () => {
		return (
			<View>
				<Text style={styles.text}>Seperate multiple input values by commas</Text>
				<TextInput
					style={styles.input}
					placeholder="Caretaking Abilities"
					onChangeText={value => this.handleChange('abilities', value)}
					placeholderTextColor={theme.primary}
				/>
			</View>
		);
	};

	renderClientBtn = () => {
		return (
			<View style={styles.routes}>
				<TouchableHighlight
					underlayColor={theme.accentTwo}
					accessibilityLabel="Tap me to create your client account."
					accessible={true}
					onPress={this.handleClientSubmit}
					style={styles.touchExpander}>
					<Text style={styles.registerButton}>Register {this.state.user === 'client' ? 'Client' : null}</Text>
				</TouchableHighlight>
			</View>
		);
	};

	renderCaretakerBtn = () => {
		return (
			<View style={styles.routes}>
				<TouchableHighlight
					underlayColor={theme.accentTwo}
					accessibilityLabel="Tap me to create your caretaker account."
					accessible={true}
					onPress={this.handleCaretakerSubmit}
					style={styles.touchExpander}>
					<Text style={styles.registerButton}>Register {this.state.user === 'caretaker' ? 'Caretaker' : null}</Text>
				</TouchableHighlight>
			</View>
		);
	};

	render () {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
					<View>
						<View style={styles.headerContainer}>
							<Text style={styles.header} accessibilityLabel="Fill in the inputs to create an account">
								Create Account
							</Text>
						</View>
						<View style={styles.routes}>
							<TouchableHighlight
								underlayColor={theme.accentTwo}
								accessibilityLabel="Tap me to create your client account."
								accessible={true}
								onPress={() => this.setState({ user: 'client' })}
								style={styles.touchExpander}>
								<Text style={styles.button}>I'm a Client</Text>
							</TouchableHighlight>
						</View>
						<View style={styles.routes}>
							<TouchableHighlight
								underlayColor={theme.accentTwo}
								accessibilityLabel="Tap me to create your caretaker account."
								accessible={true}
								onPress={() => this.setState({ user: 'caretaker' })}
								style={styles.touchExpander}>
								<Text style={styles.button}>I'm a Caretaker</Text>
							</TouchableHighlight>
						</View>
						<Text style={styles.text}>Scroll to fill out the form below:</Text>
						<ScrollView style={styles.scrollContainer}>
						<TextInput
							style={styles.input}
							placeholder="Username"
							onChangeText={value => this.handleChange('username', value)}
							placeholderTextColor={theme.primary}
						/>
						<TextInput
							style={styles.input}
							placeholder="Password"
							onChangeText={value => this.handleChange('password', value)}
							placeholderTextColor={theme.primary}
						/>
							<TextInput
							style={styles.input}
							placeholder="Password"
							onChangeText={value => this.handleChange('password_confirmation', value)}
							placeholderTextColor={theme.primary}
						/>
						<TextInput
							style={styles.input}
							placeholder="Your Name"
							onChangeText={value => this.handleChange('name', value)}
							placeholderTextColor={theme.primary}
						/>
						<TextInput
							style={styles.input}
							placeholder="Email"
							onChangeText={value => this.handleChange('email', value)}
							placeholderTextColor={theme.primary}
						/>
						<TextInput
							style={styles.input}
							placeholder="Phone"
							onChangeText={value => this.handleChange('phone', value)}
							placeholderTextColor={theme.primary}
						/>
						{this.state.user === 'client' && this.renderClientInput()}
						{this.state.user === 'caretaker' && this.renderCaretakerInput()}
						</ScrollView>
						{this.state.user === 'client' ? this.renderClientBtn() : null}
						{this.state.user === 'caretaker' ? this.renderCaretakerBtn() : null}
					</View>
				 </KeyboardAvoidingView>
		);
	}
}

const mapDispatchToProps = dispatch => ({
  logIn:(user => dispatch(logIn(user)))
});

export default connect(null, mapDispatchToProps)(CreateAccount);

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.accentOne,
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	headerContainer: {
		borderBottomColor: theme.primary,
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: 10,
		width: '80%'
	},
	header: {
		fontSize: 30,
		fontFamily: 'Didot'
	},
	routes: {
		flexDirection: 'column',
		backgroundColor: theme.primary,
		width: '90%',
		height: '10%',
		borderRadius: 30,
		justifyContent: 'space-evenly',
		margin: 5
	},
	scrollContainer: {
		marginTop: 10
	},
	button: {
		color: theme.accentOne,
		fontSize: 35,
		fontFamily: 'Didot',
		textAlign: 'center',
		marginTop: 10,
		width: '80%'
	},
	text: {
		fontSize: 25,
		fontFamily: 'Didot',
		textAlign: 'center',
		margin: 10
	},
	input: {
		width: '90%',
		height: 80,
		fontSize: 25,
		fontFamily: 'Didot',
		paddingLeft: 5,
		marginTop: 10,
		backgroundColor: theme.accentThree,
		color: theme.accentTwo
	},
	touchExpander: {
		height: '90%',
		borderRadius: 30,
		width: '90%'
	},
	registerButton: {
		fontSize: 25,
		color: theme.accentOne,
		fontFamily: 'Didot',
		textAlign: 'center',
		marginTop: 10
	}
});

// CreateAccount.propTypes = {
// };
