import { StyleSheet } from 'react-native';
import theme from '../../../theme';

export default StyleSheet.create({
	container: {
		borderBottomColor: theme.primary,
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: 10
	},
	title: {
		textAlign: 'center',
		fontSize: 30,
		fontFamily: theme.textMain,
		margin: 10
	}
});
