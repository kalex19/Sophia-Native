import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
	editItem: {
		fontSize: 15,
		color: theme.accentOne,
		fontFamily: theme.textTwo,
		marginRight: 15
	},
	vertically: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
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
	lists: {
		flexDirection: 'row',
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
