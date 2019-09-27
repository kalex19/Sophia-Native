import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import theme from '../../theme';
import { PropTypes } from 'prop-types';
import { logIn } from '../../actions';
import { postClient } from '../../Utils/postClient';
import { postCaretaker } from '../../Utils/postCaretaker';
import { logInUser } from '../../Utils/logInUser';
import { styles } from './styleCreateAccount';
import Header from '../common/Header/Header';

const initialState = {
	role: '',
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
		const multiResponseInputs = ['needs', 'allergies', 'diet', 'medications', 'abilities'];
		if (multiResponseInputs.includes(name)) {
			value = value.split(', ');
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
			medications,
			error,
			message,
			role
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
			medications,
			role
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
			const user = await logInUser(newClient.username, newClient.password);
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
			this.props.navigation.navigate('User');
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
			error,
			message,
			role
		} = this.state;

		const newCaretakerProfile = {
			username,
			password,
			password_confirmation,
			name,
			email,
			phone_number: phone,
			abilities,
			role
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
			this.props.navigation.navigate('User');
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
					value={this.state.address}
				/>
				<TextInput
					style={styles.input}
					placeholder="City"
					onChangeText={value => this.handleChange('city', value)}
					placeholderTextColor={theme.primary}
					accessibilityLabel="City Input. Please type your city"
					value={this.state.city}
				/>
				<TextInput
					style={styles.input}
					placeholder="State"
					onChangeText={value => this.handleChange('state', value)}
					placeholderTextColor={theme.primary}
					accessibilityLabel="State Input. Please type your state"
					value={this.state.state}
				/>
				<TextInput
					style={styles.input}
					placeholder="Zip Code"
					onChangeText={value => this.handleChange('zip', value)}
					placeholderTextColor={theme.primary}
					accessibilityLabel="Zip Code Input. Please type your zip code"
					value={this.state.zip}
				/>
				<Text style={styles.text}>Separate multiple input values by commas</Text>
				<TextInput
					style={styles.input}
					placeholder="Caretaking Needs"
					onChangeText={value => this.handleChange('needs', value)}
					placeholderTextColor={theme.primary}
					accessibilityLabel="Needs Input. Please type out your needs such as grocery shopping. yardwork, house cleaning and so on"
					value={this.state.needs.join(', ')}
				/>
				<TextInput
					style={styles.input}
					placeholder="Allergies"
					onChangeText={value => this.handleChange('allergies', value)}
					placeholderTextColor={theme.primary}
					accessibilityLabel="Allergies Input. Please type the names your allergies"
					value={this.state.allergies.join(', ')}
				/>
				<TextInput
					style={styles.input}
					placeholder="Dietary Restrictions"
					onChangeText={value => this.handleChange('diet', value)}
					placeholderTextColor={theme.primary}
					accessibilityLabel="Dietary Restrictions Input. Please type the names your dietary restrictions"
					value={this.state.diet.join(', ')}
				/>
				<TextInput
					style={styles.input}
					placeholder="Medications"
					onChangeText={value => this.handleChange('medications', value)}
					placeholderTextColor={theme.primary}
					accessibilityLabel="Medications Input. Please type the names of your medications"
					value={this.state.medications.join(', ')}
				/>
			</View>
		);
	};

	renderCaretakerInput = () => {
		return (
			<View>
				<Text style={styles.text} accessibilityLabel="Separate multiple input values with commas">
					Separate multiple input values with commas
				</Text>
				<TextInput
					style={styles.input}
					placeholder="Caretaking Abilities"
					onChangeText={value => this.handleChange('abilities', value)}
					placeholderTextColor={theme.primary}
					value={this.state.abilities.join(', ')}
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
					style={styles.touchExpander}
				>
					<Text style={styles.registerButton}>Register {this.state.role === 'client' && 'Client'}</Text>
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
					style={styles.touchExpander}
				>
					<Text style={styles.registerButton}>Register {this.state.role === 'caretaker' && 'Caretaker'}</Text>
				</TouchableHighlight>
			</View>
		);
	};

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="height" enabled accessible={true}>
				<Header accessibilityLabel="Fill in the inputs to create an account">Create Account</Header>
				<ScrollView style={styles.scrollContainer}>
					<View style={styles.routes}>
						<TouchableHighlight
							underlayColor={theme.accentTwo}
							accessibilityLabel="Tap me to create a client account."
							onPress={() => this.setState({ role: 'client' })}
							style={styles.touchExpander}
						>
							<Text style={styles.button}>I'm a Client</Text>
						</TouchableHighlight>
					</View>
					<View style={styles.routes}>
						<TouchableHighlight
							underlayColor={theme.accentTwo}
							accessibilityLabel="Tap me to create a caretaker account."
							onPress={() => this.setState({ role: 'caretaker' })}
							style={styles.touchExpander}
						>
							<Text style={styles.button}>I'm a Caretaker</Text>
						</TouchableHighlight>
					</View>
					{/* <Text accessibilityLabel="Scroll to fill out the form inputs below" style={styles.text}>
					Scroll to fill out the form
				</Text> */}
					<TextInput
						style={styles.input}
						placeholder="Username"
						onChangeText={value => this.handleChange('username', value)}
						placeholderTextColor={theme.primary}
						accessibilityLabel="Username Input. Please make a username"
						value={this.state.username}
					/>
					<TextInput
						style={styles.input}
						placeholder="Password"
						onChangeText={value => this.handleChange('password', value)}
						placeholderTextColor={theme.primary}
						accessibilityLabel="Password Input. Please make a password"
						minLength={8}
						secureTextEntry={true}
						value={this.state.password}
					/>
					<TextInput
						style={styles.input}
						placeholder="Password Confirmation"
						onChangeText={value => this.handleChange('password_confirmation', value)}
						placeholderTextColor={theme.primary}
						accessibilityLabel="Password Confirmation Input. Please type your password again"
						minLength={8}
						secureTextEntry={true}
						value={this.state.password_confirmation}
					/>
					<TextInput
						style={styles.input}
						placeholder="Your Name"
						onChangeText={value => this.handleChange('name', value)}
						placeholderTextColor={theme.primary}
						accessibilityLabel="Name Input. Please type for full name"
						value={this.state.name}
					/>
					<TextInput
						style={styles.input}
						placeholder="Email"
						onChangeText={value => this.handleChange('email', value)}
						placeholderTextColor={theme.primary}
						accessibilityLabel="Email Input. Please type your email"
						value={this.state.email}
					/>
					<TextInput
						style={styles.input}
						placeholder="Phone"
						onChangeText={value => this.handleChange('phone', value)}
						dataDetectorTypes={'phoneNumber'}
						placeholderTextColor={theme.primary}
						accessibilityLabel="Phone Input. Please type your phone number without dashes"
						value={this.state.phone}
					/>
					{this.state.role === 'client' && this.renderClientInput()}
					{this.state.role === 'caretaker' && this.renderCaretakerInput()}
				</ScrollView>
				{this.state.role === 'client' ? this.renderClientBtn() : null}
				{this.state.role === 'caretaker' ? this.renderCaretakerBtn() : null}
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

const mapStateToProps = state => ({
	user: state.userAccount
});

export const mapDispatchToProps = dispatch => ({
	logIn: user => dispatch(logIn(user))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateAccount);

CreateAccount.propTypes = {
	userAccount: PropTypes.object
};
