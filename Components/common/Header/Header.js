import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const Header = props => {
	return (
		<View style={styles.container}>
			<Text accessibilityLabel={props.accessibilityLabel} style={{ ...styles.title, ...props.style }}>
				{props.children}
			</Text>
		</View>
	);
};

export default Header;
