import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { logIn } from '../../actions';
import { logInUser } from '../../Utils/logInUser';
import { PropTypes } from 'prop-types';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import styles from './styles';
import Header from '../common/Header/Header';
import theme from '../../theme';
import SpeechToText from '../common/SpeechToText/SpeechToText';

const initialState = {
	username: 'Noah',
	password: 'password',
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

	render() {
		return (
			<KeyboardAvoidingView style={theme.container} behavior="padding" enabled accessibile={true}>
				<Header style={{ fontSize: 50 }}>Log In</Header>
				<Input
					value={this.state.username}
					onChangeText={value => this.handleChange('username', value)}
					accessibilityLabel="Username Input"
					saveRecordedText={text => this.handleChange('username', text)}
					label="Username"
				/>
				<Input
					value={this.state.password}
					onChangeText={value => this.handleChange('password', value)}
					accessibilityLabel="Password Input"
					minLength={8}
					secureTextEntry={true}
					saveRecordedText={text => this.handleChange('password', text)}
					label="Password"
				/>
				<Button accessibilityLabel="Tap me to log into your account." onPress={this.handleSubmit}>
					Log In
				</Button>
				<View style={{ position: 'relative', width: '100%', alignSelf: 'center' }}>
					<Text style={styles.text} accessibilityLabel="Please type a username and password">
						{this.state.message}
					</Text>
					<Text style={styles.text} accessibilityLabel="Incorrect username or password">
						{this.state.error}
					</Text>
				</View>
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
)(Login);

Login.propTypes = {
	userAccount: PropTypes.object
};
