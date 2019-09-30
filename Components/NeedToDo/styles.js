import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
	editItem: {
		fontSize: 25,
		color: theme.accentOne,
		fontFamily: theme.textTwo,
		marginRight: 15
	},
	vertically: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	align: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: theme.accentOne
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch'
	},
	text: {
		color: theme.accentOne,
		fontSize: 30,
		margin: 10,
		fontFamily: theme.textTwo,
		textAlign: 'center'
	},
	liveText: {
		color: theme.primary,
		fontFamily: theme.textMain,
		marginLeft: '20%',
		margin: 10,
		fontSize: 25
	},
	touchExpander: {
		height: '100%',
		borderRadius: 50,
		width: '100%'
	},
	emptyContainer: {
		alignSelf: 'stretch',
		backgroundColor: theme.accentOne
	},
	input: {
		borderWidth: 1,
		fontSize: 40,
		textAlign: 'center',
		backgroundColor: theme.accentT,
		width: '100%',
		fontFamily: theme.textTwo
	},
	name: {
		color: "white"
	}
});
