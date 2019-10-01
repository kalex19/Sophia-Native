import { StyleSheet } from 'react-native';
import theme from '../../../theme';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.primary,
		alignItems: 'center',
		margin: 20,
		padding: 10,
		width: '100%',
		borderRadius: 5
	},
	taskText: {
		textAlign: 'center',
		fontSize: 20,
		color: theme.accentOne,
		fontFamily: theme.textMain,
		width: '100%',
		margin: 10,
		fontFamily: theme.textTwo
	}
});
