import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import Header from '../common/Header/Header';
import Button from '../common/Button/Button';
import theme from '../../theme';

const AppHomeScreen = props => {
	return (
		<View style={theme.container}>
			<Header style={{ fontSize: 60 }} accessibilityLabel="Speech Operated Personal Household Interactive Assistant">
				SOPHIA
			</Header>
			<Button
				style={{ marginTop: 30 }}
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
