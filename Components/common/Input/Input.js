import React from 'react';
import theme from '../../../theme';
import styles from './styles';
import { View, TextInput } from 'react-native';
import SpeechToText from '../SpeechToText/SpeechToText';

const Input = props => {
	return (
		<View style={styles.container}>
			<TextInput {...props} style={{ ...styles.input, ...props.style }} placeholderTextColor={theme.primary} />
			<SpeechToText saveRecordedText={this.saveRecordedText} />
		</View>
	);
};
export default Input;
