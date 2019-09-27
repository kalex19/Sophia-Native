import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
	text: {
		fontSize: 25,
		fontFamily: theme.textMain,
		textAlign: 'center',
		margin: 10
	},
	message: {
		fontSize: 16,
		fontFamily: theme.textMain,
		color: theme.primary,
		margin: 10,
		alignSelf: 'center'
	}
});
