import { StyleSheet } from 'react-native';
import theme from '../../../theme';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.accentOne,
		borderColor: theme.primary,
		alignItems: 'center',
		margin: 10,
		padding: 5,
		width: '100%',
		borderRadius: 10,
		flex: 1,
		flexDirection: 'column',
	},
	taskHeader: {
		textAlign: 'center',
		fontSize: 20,
		color: theme.primary,
		fontFamily: theme.textMain,
		width: '100%',
		height: 40,
		margin: 10,
		backgroundColor: theme.accentThree,
		borderRadius: 5,
		padding: 2
	},
	taskText: {
		textAlign: 'center',
		fontSize: 25,
		color: theme.accentTwo,
		fontFamily: theme.textTwo,
		width: '100%',
		margin: 5,
		borderBottomColor: theme.primary,
		borderBottomWidth: StyleSheet.hairlineWidth
	}
});
