import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		alignSelf: 'center',
		width: '100%'
	},
	text: {
		color: theme.primary,
		fontSize: 20,
		margin: 5,
		fontFamily: theme.textTwo,
		textAlign: 'center'
	}
});
