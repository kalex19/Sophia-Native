import { StyleSheet } from 'react-native';
import theme from '../../../theme';

export default StyleSheet.create({
	container: {
		width: '100%'
	},
	button: {
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: theme.primary,
		borderRadius: 100,
		height: 70,
		justifyContent: 'center',
		margin: 10,
		width: '80%'
	},
	buttonText: {
		color: theme.accentOne,
		fontFamily: theme.textTwo,
		fontSize: 30
	}
});
