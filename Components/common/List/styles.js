import { StyleSheet } from 'react-native';
import theme from '../../../theme';

export default StyleSheet.create({
	listItem: {
		fontSize: 25,
		color: theme.accentOne,
		padding: 5
	},
	lists: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: theme.primary,
		alignItems: 'center',
		margin: 10,
		padding: 10
	},
	listName: {
		color: theme.accentOne,
		fontSize: 40,
		fontFamily: theme.textTwo
	},
	name: {
		color: "white",
		fontSize: 25
	}
});
