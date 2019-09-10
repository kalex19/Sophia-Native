import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import theme from '../../theme';
import { PropTypes } from 'prop-types';
import { logIn } from '../../actions';
import { postClient } from '../../Utils/postClient';
import { postCaretaker } from '../../Utils/postCaretaker';
import { logInUser } from '../../Utils/logInUser';

const initialState = {
	accountType: '',
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
	abilities: [],
	error: '',
	message: ''
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

	handleClientSubmit = async () => {
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
			// accountType
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
			// accountType
		};
		if (
			!username ||
			!password ||
			!password_confirmation ||
			!name ||
			!email ||
			!phone ||
			!address ||
			!state ||
			!city ||
			!zip ||
			!needs ||
			!allergies ||
			!diet ||
			!medications
		) {
			this.setState({ message: 'Please fill out all input fields' });
		} else {
			const newClient = await postClient(newClientProfile);
      const user = await logInUser(newClient.username, newClient.password)
			this.props.logIn(user);
			this.setState({ message: '', error: user.message });
		}
		if (
			!error &&
			username &&
			password &&
			password_confirmation &&
			name &&
			email &&
			phone &&
			address &&
			state &&
			city &&
			zip &&
			needs &&
			allergies &&
			diet &&
			medications
		) {
			this.setState({ initialState });
			this.props.navigation.navigate('User', user);
		}
	};

	handleCaretakerSubmit = async () => {
		const {
			username,
			password,
			password_confirmation,
			name,
			email,
			phone,
			abilities,
			error
			// accountType waiting for BE adjustment
		} = this.state;

		const newCaretakerProfile = {
			username,
			password,
			password_confirmation,
			name,
			email,
			phone_number: phone,
			abilities
			// accountType
		};
		if (!username || !password || !password_confirmation || !name || !email || !phone || !abilities) {
			this.setState({ message: 'Please fill out all input fields' });
		} else {
			const newCaretaker = await postCaretaker(newCaretakerProfile);
			const user = await logInUser(newCaretaker.username, newCaretaker.password);
			this.props.logIn(user);
			this.setState({ message: '', error: user.message });
		}
		if (!error && username && password && password_confirmation && name && email && phone && abilities) {
			this.setState({ initialState });
			this.props.navigation.navigate('User', user);
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
					accessibilityLabel="Address Input. Please type your address"
				/>
				<TextInput
					style={styles.input}
					placeholder="City"
					onChangeText={value => this.handleChange('city', value)}
					placeholderTextColor={theme.primary}
					accessibilityLabel="City Input. Please type your city"
				/>
				<TextInput
					style={styles.input}
					placeholder="State"
					onChangeText={value => this.handleChange('state', value)}
					placeholderTextColor={theme.primary}
					accessibilityLabel="State Input. Please type your state"
				/>
				<TextInput
					style={styles.input}
					placeholder="Zip Code"
					onChangeText={value => this.handleChange('zip', value)}
					placeholderTextColor={theme.primary}
					accessibilityLabel="Zip Code Input. Please type your zip code"
				/>
				<Text style={styles.text}>Seperate multiple input values by commas</Text>
				<TextInput
					style={styles.input}
					placeholder="Caretaking Needs"
					onChangeText={value => this.handleChange('needs', value)}
					placeholderTextColor={theme.primary}
					accessibilityLabel="Needs Input. Please type out your needs such as grocery shopping. yardwork, house cleaning and so on"
				/>
				<TextInput
					style={styles.input}
					placeholder="Allergies"
					onChangeText={value => this.handleChange('allergies', value)}
					placeholderTextColor={theme.primary}
					accessibilityLabel="Allergies Input. Please type the names your allergies"
				/>
				<TextInput
					style={styles.input}
					placeholder="Dietary Restrictions"
					onChangeText={value => this.handleChange('diet', value)}
					placeholderTextColor={theme.primary}
					accessibilityLabel="Dietary Restrictions Input. Please type the names your dietary restrictions"
				/>
				<TextInput
					style={styles.input}
					placeholder="Medications"
					onChangeText={value => this.handleChange('medications', value)}
					placeholderTextColor={theme.primary}
					accessibilityLabel="Medications Input. Please type the names of your medications"
				/>
			</View>
		);
	};

	renderCaretakerInput = () => {
		return (
			<View>
				<Text style={styles.text} accessibilityLabel="Seperate multiple input values with commas">
					Seperate multiple input values with commas
				</Text>
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
					accessibilityLabel="Tap me to create your client account"
					accessible={true}
					onPress={this.handleClientSubmit}
					style={styles.touchExpander}>
					<Text style={styles.registerButton}>Register {this.state.accountType === 'client' ? 'Client' : null}</Text>
				</TouchableHighlight>
			</View>
		);
	};

	renderCaretakerBtn = () => {
		return (
			<View style={styles.routes}>
				<TouchableHighlight
					underlayColor={theme.accentTwo}
					accessibilityLabel="Tap me to create your caretaker account"
					accessible={true}
					onPress={this.handleCaretakerSubmit}
					style={styles.touchExpander}>
					<Text style={styles.registerButton}>
						Register {this.state.accountType === 'caretaker' ? 'Caretaker' : null}
					</Text>
				</TouchableHighlight>
			</View>
		);
	};

	render () {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="height" enabled accessible={true}>
				<View style={styles.headerContainer}>
					<Text style={styles.header} accessibilityLabel="Fill in the inputs to create an account">
						Create Account
					</Text>
				</View>
				<View style={styles.routes}>
					<TouchableHighlight
						underlayColor={theme.accentTwo}
						accessibilityLabel="Tap me to create a client account."
						onPress={() => this.setState({ accountType: 'client' })}
						style={styles.touchExpander}>
						<Text style={styles.button}>I'm a Client</Text>
					</TouchableHighlight>
				</View>
				<View style={styles.routes}>
					<TouchableHighlight
						underlayColor={theme.accentTwo}
						accessibilityLabel="Tap me to create a caretaker account."
						onPress={() => this.setState({ accountType: 'caretaker' })}
						style={styles.touchExpander}>
						<Text style={styles.button}>I'm a Caretaker</Text>
					</TouchableHighlight>
				</View>
				<Text accessibilityLabel="Scroll to fill out the form inputs below" style={styles.text}>
					Scroll to fill out the form
				</Text>
				<ScrollView style={styles.scrollContainer}>
					<TextInput
						style={styles.input}
						placeholder="Username"
						onChangeText={value => this.handleChange('username', value)}
						placeholderTextColor={theme.primary}
						accessibilityLabel="Username Input. Please make a username"
					/>
					<TextInput
						style={styles.input}
						placeholder="Password"
						onChangeText={value => this.handleChange('password', value)}
						placeholderTextColor={theme.primary}
						accessibilityLabel="Password Input. Please make a password"
						minLength={8}
						secureTextEntry={true}
					/>
					<TextInput
						style={styles.input}
						placeholder="Password Confirmation"
						onChangeText={value => this.handleChange('password_confirmation', value)}
						placeholderTextColor={theme.primary}
						accessibilityLabel="Password Confirmation Input. Please type your password again"
						minLength={8}
						secureTextEntry={true}
					/>
					<TextInput
						style={styles.input}
						placeholder="Your Name"
						onChangeText={value => this.handleChange('name', value)}
						placeholderTextColor={theme.primary}
						accessibilityLabel="Name Input. Please type for full name"
					/>
					<TextInput
						style={styles.input}
						placeholder="Email"
						onChangeText={value => this.handleChange('email', value)}
						placeholderTextColor={theme.primary}
						accessibilityLabel="Email Input. Please type your email"
					/>
					<TextInput
						style={styles.input}
						placeholder="Phone"
						onChangeText={value => this.handleChange('phone', value)}
						dataDetectorTypes={'phoneNumber'}
						placeholderTextColor={theme.primary}
						accessibilityLabel="Phone Input. Please type your phone number without dashes"
					/>
					{this.state.accountType === 'client' && this.renderClientInput()}
					{this.state.accountType === 'caretaker' && this.renderCaretakerInput()}
				</ScrollView>
				{this.state.accountType === 'client' ? this.renderClientBtn() : null}
				{this.state.accountType === 'caretaker' ? this.renderCaretakerBtn() : null}
				<Text style={styles.messages} accessibilityLabel={'Please fill out all input fields'}>
					{this.state.message}
				</Text>
				<Text style={styles.messages} accessibilityLabel={'Error Message'}>
					{this.state.error}
				</Text>
			</KeyboardAvoidingView>
		);
	}
}

const mapStateToProps = store => ({
	userAccount: store.userAccount
});

const mapDispatchToProps = dispatch => ({
	logIn: user => dispatch(logIn(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.accentOne,
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	},
	headerContainer: {
		borderBottomColor: theme.primary,
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: 10
	},
	header: {
		fontSize: 30,
		fontFamily: theme.textMain
	},
	routes: {
		flexDirection: 'column',
		backgroundColor: theme.primary,
		height: '10%',
		borderRadius: 30,
		justifyContent: 'space-evenly',
		margin: 5,
		width: '80%',
		alignItems: 'center'
	},
	scrollContainer: {
		margin: 10
	},
	button: {
		color: theme.accentOne,
		fontSize: 25,
		fontFamily: theme.textTwo,
		margin: 10,
		width: '100%'
	},
	text: {
		fontSize: 25,
		fontFamily: theme.textMain,
		textAlign: 'center',
		margin: 10
	},
	input: {
		width: '100%',
		height: 80,
		fontSize: 30,
		fontFamily: theme.textTwo,
		padding: 5,
		marginTop: 10,
		backgroundColor: theme.accentThree,
		color: theme.accentTwo
	},
	touchExpander: {
		height: '100%',
		borderRadius: 30,
		width: '100%'
	},
	registerButton: {
		fontSize: 30,
		color: theme.accentOne,
		fontFamily: theme.textTwo,
		textAlign: 'center',
		marginTop: 10
	},
	messages: {
		fontSize: 16,
		fontFamily: theme.textMain,
		color: theme.primary,
		margin: 10
	}
});

CreateAccount.propTypes = {
	userAccount: PropTypes.object
};
