import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { PropTypes } from 'prop-types';
import { logIn } from '../../actions';
import { postClient } from '../../Utils/postClient';
import { postCaretaker } from '../../Utils/postCaretaker';
import { logInUser } from '../../Utils/logInUser';
import { styles } from './styles';
import Header from '../common/Header/Header';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';

const initialState = {
	page: 1,
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
		this.setState({ [name]: value });
	};

	handleClientSubmit = async () => {
		console.log("error", this.state.error)
		console.log("message",this.state.message)
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

	renderClientInformationForm = () => {
		return (
			<ScrollView style={{ flex: 1, width: '100%' }}>
				<Input
					placeholder="Street Address"
					onChangeText={value => this.handleChange('address', value)}
					accessibilityLabel="Address Input. Please type your address"
					value={this.state.address}
				/>
				<Input
					placeholder="City"
					onChangeText={value => this.handleChange('city', value)}
					accessibilityLabel="City Input. Please type your city"
					value={this.state.city}
				/>
				<Input
					placeholder="State"
					onChangeText={value => this.handleChange('state', value)}
					accessibilityLabel="State Input. Please type your state"
					value={this.state.state}
				/>
				<Input
					placeholder="Zip Code"
					onChangeText={value => this.handleChange('zip', value)}
					accessibilityLabel="Zip Code Input. Please type your zip code"
					value={this.state.zip}
				/>
				<Button accessibilityLabel="Tap me to continue creating your client account" onPress={() => this.setState({ page: 4 })}>
					Next
				</Button>
				<Button accessibilityLabel="Tap me to go back" onPress={() => this.setState({ page: 1 })}>
					Back
				</Button>
				<View style={{ height: 100 }} />
				<SafeAreaView />
			</ScrollView>
		);
	};

	renderClientNeedsForm = () => {
		return (
			<ScrollView style={{ flex: 1, width: '100%' }}>
				<Text style={styles.text}>Separate multiple input values by commas</Text>
				<Input
					placeholder="Caretaking Needs"
					onChangeText={value => this.handleChange('needs', value)}
					accessibilityLabel="Needs Input. Please type out your needs such as grocery shopping. yardwork, house cleaning and so on"
					value={this.state.needs.join(', ')}
				/>
				<Input
					placeholder="Allergies"
					onChangeText={value => this.handleChange('allergies', value)}
					accessibilityLabel="Allergies Input. Please type the names of your allergies"
					value={this.state.allergies.join(', ')}
				/>
				<Input
					placeholder="Dietary Restrictions"
					onChangeText={value => this.handleChange('diet', value)}
					accessibilityLabel="Dietary Restrictions Input. Please type the names of your dietary restrictions"
					value={this.state.diet.join(', ')}
				/>
				<Input
					placeholder="Medications"
					onChangeText={value => this.handleChange('medications', value)}
					accessibilityLabel="Medications Input. Please type the names of your medications"
					value={this.state.medications.join(', ')}
				/>
				<Button accessibilityLabel="Tap me to create your client account" onPress={this.handleClientSubmit}>
					Register Client
				</Button>
				<Button accessibilityLabel="Tap me to go back" onPress={() => this.setState({ page: 3 })}>
					Back
				</Button>
				<View style={{ height: 100 }} />
				<SafeAreaView />
			</ScrollView>
		);
	};

	renderCaretakerForm = () => {
		return (
			<ScrollView style={{ flex: 1, width: '100%' }}>
				<Text style={styles.text} accessibilityLabel="Separate multiple input values with commas">
					Separate multiple input values with commas
				</Text>
				<Input
					placeholder="Caretaking Abilities"
					onChangeText={value => this.handleChange('abilities', value)}
					value={this.state.abilities.join(', ')}
				/>
				<Button accessibilityLabel="Tap me to create your client account" onPress={this.handleCaretakerSubmit}>
					Register Caretaker
				</Button>
				<Button accessibilityLabel="Tap me to go back" onPress={() => this.setState({ page: 1 })}>
					Back
				</Button>
				<View style={{ height: 100 }} />
				<SafeAreaView />
			</ScrollView>
		);
	};

	renderGenericForm = () => {
		return (
			<ScrollView style={{ flex: 1, width: '100%' }}>
				<Input
					placeholder="Your Name"
					onChangeText={value => this.handleChange('name', value)}
					accessibilityLabel="Name Input. Please type in your full name"
					value={this.state.name}
				/>
				<Input
					placeholder="Email"
					onChangeText={value => this.handleChange('email', value)}
					accessibilityLabel="Email Input. Please type in your email"
					value={this.state.email}
				/>
				<Input
					placeholder="Phone"
					onChangeText={value => this.handleChange('phone', value)}
					dataDetectorTypes={'phoneNumber'}
					accessibilityLabel="Phone Input. Please type your phone number without dashes"
					value={this.state.phone}
				/>
				<Input
					placeholder="Username"
					onChangeText={value => this.handleChange('username', value)}
					accessibilityLabel="Username Input. Please make a username"
					value={this.state.username}
				/>
				<Input
					placeholder="Password"
					onChangeText={value => this.handleChange('password', value)}
					accessibilityLabel="Password Input. Please make a password"
					minLength={8}
					secureTextEntry={true}
					value={this.state.password}
				/>
				<Input
					placeholder="Password Confirmation"
					onChangeText={value => this.handleChange('password_confirmation', value)}
					accessibilityLabel="Password Confirmation Input. Please type your new password again"
					minLength={8}
					secureTextEntry={true}
					value={this.state.password_confirmation}
				/>
				<Button
					accessibilityLabel="Tap me to continue creating a caretaker account."
					onPress={() => this.setState({ role: 'caretaker', page: 2 })}
				>
					I'm a Caretaker
				</Button>
				<Button
					accessibilityLabel="Tap me to continue creating a client account."
					onPress={() => this.setState({ role: 'client', page: 3 })}
				>
					I'm a Client
				</Button>
			</ScrollView>
		);
	};

	render() {
		let formToRender;
		switch (this.state.page) {
			case 1:
				formToRender = this.renderGenericForm();
				break;
			case 2:
				formToRender = this.renderCaretakerForm();
				break;
			case 3:
				formToRender = this.renderClientInformationForm();
				break;
			case 4:
				formToRender = this.renderClientNeedsForm();
				break;
			default:
				break;
		}

		return (
			<KeyboardAvoidingView style={{...styles.container}} behavior="height" enabled accessible>
				<Header accessibilityLabel="Fill in the inputs to create an account">Create Account</Header>
				{formToRender}
				{this.state.error.length !== 0 && <Text style={styles.message}>{this.state.error}</Text>}
				{this.state.message.length !== 0 && <Text style={styles.message}>{this.state.message}</Text>}
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
