import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { TouchableHighlight } from 'react-native-gesture-handler';

const Button = props => {
	return (
		<View style={styles.container}>
			<TouchableHighlight {...props} style={{ ...styles.button, ...props.style }}>
				<Text style={styles.buttonText}>{props.children}</Text>
			</TouchableHighlight>
		</View>
	);
};

export default Button;
