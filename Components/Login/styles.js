import { StyleSheet } from 'react-native';
import theme from '../../theme';
export default StyleSheet.create({
	container: {
		backgroundColor: theme.accentOne,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	text: {
		fontSize: 24,
		fontFamily: theme.textMain,
		color: theme.primary,
		margin: 10,
		position: 'absolute',
		textAlign: 'center',
		alignSelf: 'center',
		width: '85%'
	}
});
