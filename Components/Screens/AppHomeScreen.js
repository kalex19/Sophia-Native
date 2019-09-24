import React from 'react';
import { View, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import styles from './styleAppHomeScreen';
import Button from '../common/Button/Button';

const AppHomeScreen = props => {
	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<Text style={styles.logo} accessibilityLabel="Speech Operated Personal Household Interactive Assistant">
					SOPHIA
				</Text>
			</View>
			<Button accessibilityLabel="Tap me to log in to your account" onPress={() => props.navigation.navigate('Login')}>
				Log In
			</Button>
			<Button
				accessibilityLabel="Tap me to create a new account"
				onPress={() => props.navigation.navigate('CreateAccount')}
			>
				Create Account
			</Button>
		</View>
	);
};

export default AppHomeScreen;
