import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.accentOne,
		flex: 1,
		width: '100%'
	},
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
		margin: 10
	}
});
