import React from 'react';
import { View, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import styles from './styleAppHomeScreen';

const AppHomeScreen = props => {
	return (
		<View style={styles.container} >
			<View style={styles.logoContainer}>
				<Text style={styles.logo} accessibilityLabel="Speech Operated Personal Household Interactive Assistant">
					SOPHIA
				</Text>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableHighlight
					accessibilityLabel="Tap me to log in to your account"
					accessible={true}
					onPress={() => props.navigation.navigate('Login')}
					style={styles.button}
				>
					<Text style={styles.buttonText}> Log In </Text>
				</TouchableHighlight>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableHighlight
					accessibilityLabel="Tap me to create a new account"
					accessible={true}
					onPress={() => props.navigation.navigate('CreateAccount')}
					style={styles.button}
				>
					<Text style={styles.buttonText}> Create Account </Text>
				</TouchableHighlight>
			</View>
		</View>
	);
};

export default AppHomeScreen;
