import React from 'react';
import { View, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { styles } from './styleAppHomeScreen';
import Header from '../common/Header/Header';

const AppHomeScreen = props => {
	return (
		<View style={styles.container}>
			<Header style={{ fontSize: 40 }} accessibilityLabel="Speech Operated Personal Household Interactive Assistant">
				SOPHIA
			</Header>
			<View style={styles.routes}>
				<TouchableHighlight
					underlayColor="black"
					accessibilityLabel="Tap me to log in to your account"
					accessible={true}
					onPress={() => props.navigation.navigate('Login')}
					style={styles.touchExpander}
				>
					<Text style={styles.button}> Log In </Text>
				</TouchableHighlight>
			</View>
			<View style={styles.routes}>
				<TouchableHighlight
					underlayColor="black"
					accessibilityLabel="Tap me to create a new account"
					accessible={true}
					onPress={() => props.navigation.navigate('CreateAccount')}
					style={styles.touchExpander}
				>
					<Text style={styles.button}> Create Account </Text>
				</TouchableHighlight>
			</View>
		</View>
	);
};

export default AppHomeScreen;
