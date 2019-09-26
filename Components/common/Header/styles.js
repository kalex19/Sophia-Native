import { StyleSheet } from 'react-native';
import theme from '../../../theme';

export default StyleSheet.create({
	container: {
		borderColor: theme.primary,
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: 20,
		padding: 10
	},
	title: {
		fontSize: 40,
		fontFamily: theme.textMain,
		textAlign: 'center'
	}
});
