import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { logIn } from '../../actions';
import { logInUser } from '../../Utils/logInUser';
import { PropTypes } from 'prop-types';
import theme from '../../theme';

const initialState = {
	accountType: '',
	username: '',
	password: '',
	message: '',
	error: '',
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
		})
		if(this.state.username === '' || this.state.password === ''){
			this.setState({message: "Please type in a username and password"}) 
		} else {
			const user = await this.logInUser(username, password);
			this.props.logIn(user)
			this.setState({message: '', error: user.message})
		}
		if(!this.state.error && this.state.username && this.state.password){
			this.setState({
				accountType: '',
				username: '',
				password: ''
			})
			this.props.navigation.navigate('User', this.props.userAccount)
		} 
	
	}

	logInUser = async (username, password) => {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({username, password})
		};
		try {
			const response = await fetch('https://sophia-be.herokuapp.com/api/v1/login', options);
			const user = await response.json();
			return user
		} catch (error) {
			throw new Error(`failed to post profile: ${error.message}`);
		} 
	}

	render () {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled 	accessibile={true}>
				<View style={styles.headerContainer}>
					<Text style={styles.header}> Log In </Text>
				</View>
				<TextInput
					style={styles.input}
					value={this.state.username}
					placeholder="Username"
					onChangeText={value => this.handleChange('username', value)}
					accessibilityLabel={"Username Input"}
					placeholderTextColor="maroon"
				/>
				<TextInput
					style={styles.input}
					value={this.state.password}
					placeholder="Password"
					onChangeText={value => this.handleChange('password', value)}
					accessibilityLabel={"Password Input"}
					minLength={8}
					secureTextEntry={true}  
					placeholderTextColor="maroon"
				/>
				<Text style={styles.text} accessibilityLabel={"Please type a username and password"}>{this.state.message}</Text>
				<View style={styles.routes}>
					<TouchableHighlight
						underlayColor="black"
						accessibilityLabel="Tap me to log into your account."
						onPress={this.handleSubmit}
						style={styles.touchExpander}>
						<Text style={styles.button}> Log In </Text>
					</TouchableHighlight>
				</View>
				<Text style={styles.text} accessibilityLabel={"Incorrect username or password"} >{this.state.error}</Text>
			</KeyboardAvoidingView>
		);
	}
}

const mapStateToProps = state => ({
	userAccount: state.userAccount
})

const mapDispatchToProps = dispatch => ({
	logIn: user => dispatch(logIn(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
		fontSize: 45,
		fontFamily: theme.textMain,
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
	button: {
		color: theme.accentOne,
		fontSize: 35,
		fontFamily: theme.textTwo,
		textAlign: 'center',
		marginTop: 10,
		height: 50,
		minHeight: 44,
		minWidth: 44,
	},
	input: {
		width: '90%',
		height: 80,
		fontSize: 25,
		fontFamily: theme.textTwo,
		paddingLeft: 15,
		margin: 10,
		backgroundColor: theme.accentThree,
		color: theme.accentTwo,
	},
	touchExpander: {
		height: '100%',
		borderRadius: 30,
		width: '100%'
	},
	text: {
		fontSize: 16,
		fontFamily: theme.textMain,
		color: theme.primary,
		margin: 10,
	}
});

Login.propTypes = {
	userAccount: PropTypes.object
 };