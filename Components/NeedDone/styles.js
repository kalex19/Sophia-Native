import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
	listItem: {
		fontSize: 25,
		color: theme.accentOne,
		padding: 5
	},
	align: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: theme.accentOne
	},
	listName: {
		color: theme.accentOne,
		fontSize: 40,
		fontFamily: theme.textTwo
	},
	text: {
		color: theme.primary,
		fontSize: 20,
		margin: 5,
		fontFamily: theme.textTwo,
		textAlign: 'center'
	}
});
