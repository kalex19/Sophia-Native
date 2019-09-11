import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { logIn } from '../../actions';
import { logInUser } from '../../Utils/logInUser';
import { PropTypes } from 'prop-types';
import theme from '../../theme';
import { styles } from './styleLogin';

const initialState = {
	username: '',
	password: '',
	message: '',
	error: ''
};

export class Login extends Component {
	state = initialState;

	handleChange = (name, value) => {
		this.setState({
			[name]: value
		});
	};

	handleSubmit = async () => {
		const { username, password } = this.state;
		this.setState({
			error: ''
		});
		if (!this.state.username || !this.state.password) {
			this.setState({
				message: 'Please type in a username and password'
			});
		} else {
			const user = await logInUser(username, password);
			this.props.logIn(user);
			this.setState({
				message: '',
				error: user.message
			});
		}
		if (!this.state.error && this.state.username && this.state.password) {
			this.setState({
				username: '',
				password: ''
			});
			this.props.navigation.navigate('User', this.props.user);
		}
	};

	render () {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled accessibile={true}>
				<View style={styles.headerContainer}>
					<Text style={styles.header}> Log In </Text>
				</View>
				<TextInput
					style={styles.input}
					value={this.state.username}
					onChangeText={value => this.handleChange('username', value)}
					placeholder="Username"
					accessibilityLabel={'Username Input'}
					placeholderTextColor={theme.primary}
				/>
				<TextInput
					style={styles.input}
					value={this.state.password}
					placeholder="Password"
					onChangeText={value => this.handleChange('password', value)}
					accessibilityLabel={'Password Input'}
					minLength={8}
					secureTextEntry={true}
					placeholderTextColor={theme.primary}
				/>
				<Text style={styles.text} accessibilityLabel={'Please type a username and password'}>
					{this.state.message}
				</Text>
				<View style={styles.routes}>
					<TouchableHighlight
						underlayColor="black"
						accessibilityLabel="Tap me to log into your account."
						onPress={this.handleSubmit}
						style={styles.touchExpander}>
						<Text style={styles.button}> Log In </Text>
					</TouchableHighlight>
				</View>
				<Text style={styles.text} accessibilityLabel={'Incorrect username or password'}>
					{this.state.error}
				</Text>
			</KeyboardAvoidingView>
		);
	}
}

const mapStateToProps = state => ({
	user: state.userAccount
});

const mapDispatchToProps = dispatch => ({
	logIn: user => dispatch(logIn(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
	userAccount: PropTypes.object
};
