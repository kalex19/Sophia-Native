import React from 'react';
import { View, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { styles } from './styles';
import Header from '../common/Header/Header';
import Button from '../common/Button/Button';

const AppHomeScreen = props => {
	return (
		<View style={styles.container}>
			<Header style={{ fontSize: 40 }} accessibilityLabel="Speech Operated Personal Household Interactive Assistant">
				SOPHIA
			</Header>
			<Button
				accessibilityLabel="Tap me to create a new account"
				onPress={() => props.navigation.navigate('CreateAccount')}
			>
				Create Account
			</Button>
			<Button accessibilityLabel="Tap me to log in to your account" onPress={() => props.navigation.navigate('Login')}>
				Log In
			</Button>
		</View>
	);
};

export default AppHomeScreen;
