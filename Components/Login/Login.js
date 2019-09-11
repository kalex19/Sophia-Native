import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Animated } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { logIn } from '../../actions';
import {logInUser} from '../../Utils/logInUser';
import { PropTypes } from 'prop-types';
import theme from '../../theme';

const initialState = {
	username: '',
	password: '',
	message: '',
	error: '',
};

class FloatingInputLabel extends Component{
	state = {
		isFocused: false
	}

	componentWillMount(){
		this._animatedIsFocused = new Animated.Value(this.props.value === "" ? 0 : 1);
	}

	componentDidUpdate(){
		Animated.timing(this._animatedIsFocused, {
			toValue: (this.state.isFocused || !this.props.value === "") ? 1 : 0,
			duration: 200,
		}).start();
	}

	handleFocus = () => {
		this.setState({
			isFocused: true
		})
	}

	handleBlur = () => {
		this.setState({
			isFocused: flase
		})
	}

	render(){
		const {label, ...props } = this.props;
		const {isFocused} = this.state;
		const labelStyle = {
			position:'absolute',
			left: 0,
			top: this._animatedIsFocused.interpolate({
				inputRange: [0,1],
				outputRange: [18, 0],

			}),
			fontSize: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [25, 20],	
			}),
			color: this._animatedIsFocused.interpolate({
				inputRange: [0,1],
				outputRange: [theme.accentTwo, theme.primary],
			}),
			fontFamily: theme.textTwo,
		}
		return(
			<View style={{paddingTop: 18}}>
				<Animated.Text style={styles.labelStyle}>{label}</Animated.Text>
				<TextInput
					style={styles.input}
					placeholder="Username"
					accessibilityLabel={"Username Input"}
					placeholderTextColor={theme.primary}
					{...props}
					onFocus={this.handleFocus} 
					onBlur={this.handleBlur}
				/>
			</View>
		)
	}
}

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
		if(!this.state.username || !this.state.password){
			this.setState({message: "Please type in a username and password"}) 
		} else {
			const user = await logInUser(username, password);
			this.props.logIn(user)
			this.setState({message: '', error: user.message})
		}
		if(!this.state.error && this.state.username && this.state.password){
			this.setState({
				username: '',
				password: ''
			})
			this.props.navigation.navigate('User', this.props.user)
		} 
	}

	render () {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled 	accessibile={true}>
				<View style={styles.headerContainer}>
					<Text style={styles.header}> Log In </Text>
				</View>
				<FloatingInputLabel label="Username" value={this.state.username} onChange={this.handleChange}></FloatingInputLabel>
				<Text style={styles.text}>Password</Text>
				<TextInput
					style={styles.input}
					value={this.state.password}
					placeholder="Password"
					onChangeText={value => this.handleChange('password', value)}
					accessibilityLabel={"Password Input"}
					minLength={8}
					secureTextEntry={true}  
					placeholderTextColor={theme.primary}
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
	user: state.userAccount
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