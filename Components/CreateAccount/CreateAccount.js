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
import theme from '../../theme';

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
			!this.state.error &&
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
		if (!this.state.error && username && password && password_confirmation && name && email && phone && abilities) {
			this.setState({ initialState });
			this.props.navigation.navigate('User');
		}
	};

	renderClientInformationForm = () => {
		return (
			<ScrollView style={{ flex: 1, width: '100%' }}>
				<Input
					label="Street Address"
					onChangeText={value => this.handleChange('address', value)}
					accessibilityLabel="Address Input. Please type your address"
					saveRecordedText={text => this.handleChange('address', text)}
					value={this.state.address}
				/>

				<Input
					label="City"
					onChangeText={value => this.handleChange('city', value)}
					accessibilityLabel="City Input. Please type your city"
					value={this.state.city}
					saveRecordedText={text => this.handleChange('city', text)}
				/>

				<Input
					label="State"
					onChangeText={value => this.handleChange('state', value)}
					accessibilityLabel="State Input. Please type your state"
					value={this.state.state}
					saveRecordedText={text => this.handleChange('state', text)}
				/>

				<Input
					label="Zip Code"
					onChangeText={value => this.handleChange('zip', value)}
					accessibilityLabel="Zip Code Input. Please type your zip code"
					value={this.state.zip}
					saveRecordedText={text => this.handleChange('zip', text)}
				/>

				<Button
					accessibilityLabel="Tap me to continue creating your client account"
					onPress={() => this.setState({ page: 4 })}
				>
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
					label="Caretaking Needs"
					onChangeText={value => this.handleChange('needs', value)}
					accessibilityLabel="Needs Input. Please type out your needs such as grocery shopping. yardwork, house cleaning and so on"
					value={this.state.needs.join(', ')}
					saveRecordedText={text => this.handleChange('needs', text)}
				/>

				<Input
					label="Allergies"
					onChangeText={value => this.handleChange('allergies', value)}
					accessibilityLabel="Allergies Input. Please type the names of your allergies"
					value={this.state.allergies.join(', ')}
					saveRecordedText={text => this.handleChange('allergies', text)}
				/>

				<Input
					label="Dietary Restrictions"
					onChangeText={value => this.handleChange('diet', value)}
					accessibilityLabel="Dietary Restrictions Input. Please type the names of your dietary restrictions"
					value={this.state.diet.join(', ')}
					saveRecordedText={text => this.handleChange('diet', text)}
				/>

				<Input
					label="Medications"
					onChangeText={value => this.handleChange('medications', value)}
					accessibilityLabel="Medications Input. Please type the names of your medications"
					value={this.state.medications.join(', ')}
					saveRecordedText={text => this.handleChange('medications', text)}
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
					label="Caretaking Abilities"
					onChangeText={value => this.handleChange('abilities', value)}
					value={this.state.abilities.join(', ')}
					saveRecordedText={text => this.handleChange('abilities', text)}
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
					label="Your Name"
					onChangeText={value => this.handleChange('name', value)}
					accessibilityLabel="Name Input. Please type in your full name"
					value={this.state.name}
					saveRecordedText={text => this.handleChange('name', text)}
				/>
				<Input
					label="Email"
					onChangeText={value => this.handleChange('email', value)}
					accessibilityLabel="Email Input. Please type in your email"
					value={this.state.email}
					saveRecordedText={text => this.handleChange('email', text)}
				/>

				<Input
					label="Phone"
					onChangeText={value => this.handleChange('phone', value)}
					dataDetectorTypes={'phoneNumber'}
					accessibilityLabel="Phone Input. Please type your phone number without dashes"
					value={this.state.phone}
					saveRecordedText={text => this.handleChange('phone', text)}
				/>

				<Input
					label="Username"
					onChangeText={value => this.handleChange('username', value)}
					accessibilityLabel="Username Input. Please make a username"
					value={this.state.username}
					saveRecordedText={text => this.handleChange('username', text)}
				/>

				<Input
					label="Password"
					onChangeText={value => this.handleChange('password', value)}
					accessibilityLabel="Password Input. Please make a password"
					minLength={8}
					secureTextEntry={true}
					value={this.state.password}
					saveRecordedText={text => this.handleChange('password', text)}
				/>

				<Input
					label="Password Confirmation"
					onChangeText={value => this.handleChange('password_confirmation', value)}
					accessibilityLabel="Password Confirmation Input. Please type your new password again"
					minLength={8}
					secureTextEntry={true}
					value={this.state.password_confirmation}
					saveRecordedText={text => this.handleChange('password_confirmation', text)}
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
				<Button
					accessibilityLabel="Tap me to continue creating a client account."
					onPress={() => this.props.navigation.navigate('Home')}
				>
					Back
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
			<KeyboardAvoidingView style={theme.container} behavior="height" enabled accessible>
				<Header style={{ marginTop: 30 }} accessibilityLabel="Fill in the inputs to create an account">
					Create Account
				</Header>
				{formToRender}
				{this.state.error !== '' && <Text style={styles.message}>That username or email already exists</Text>}
				<Text style={styles.message}>{this.state.message}</Text>
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

// expandInputField = () => {
// 	this.setState({ displayExtraInputs: !this.state.displayExtraInputs });
// };
// potentially use this on all input fields?
