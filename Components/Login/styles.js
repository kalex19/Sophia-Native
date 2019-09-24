import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
	container: {
		backgroundColor: theme.accentOne,
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	},
	headerContainer: {
		borderBottomColor: theme.primary,
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: 10
	},
	header: {
		fontSize: 45,
		fontFamily: theme.textMain
	},
	routes: {
		flexDirection: 'column',
		backgroundColor: theme.primary,
		width: '90%',
		height: '10%',
		borderRadius: 30,
		justifyContent: 'space-evenly',
		margin: 5
	},
	button: {
		color: theme.accentOne,
		fontSize: 35,
		fontFamily: theme.textTwo,
		textAlign: 'center',
		marginTop: 10,
		height: 50,
		minHeight: 44,
		minWidth: 44
	},
	input: {
		width: '90%',
		height: 80,
		fontSize: 25,
		fontFamily: theme.textTwo,
		paddingLeft: 15,
		margin: 10,
		backgroundColor: theme.accentThree,
		color: theme.accentTwo
	},
	touchExpander: {
		height: '100%',
		borderRadius: 30,
		width: '100%'
	},
	text: {
		fontSize: 16,
		fontFamily: theme.textMain,
		color: theme.primary,
		margin: 10
	}
});
