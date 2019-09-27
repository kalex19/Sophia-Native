import { StyleSheet } from "react-native";
import theme from '../../theme';

export const styles = StyleSheet.create({
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
		fontSize: 30,
		fontFamily: theme.textMain
	},
	routes: {
		flexDirection: 'column',
		backgroundColor: theme.primary,
		height: '10%',
		borderRadius: 30,
		justifyContent: 'space-evenly',
		margin: 5,
		width: '90%',
		alignItems: 'center'
	},
	scrollContainer: {
		margin: 10
	},
	button: {
		color: theme.accentOne,
		fontSize: 25,
		fontFamily: theme.textTwo,
		margin: 10,
		width: '100%'
	},
	text: {
		fontSize: 25,
		fontFamily: theme.textMain,
		textAlign: 'center',
		margin: 10
	},
	input: {
		width: '100%',
		height: 80,
		fontSize: 30,
		fontFamily: theme.textTwo,
		padding: 5,
		marginTop: 10,
		backgroundColor: theme.accentThree,
		color: theme.accentTwo
	},
	touchExpander: {
		height: '100%',
		borderRadius: 30,
		width: '100%'
	},
	registerButton: {
		fontSize: 30,
		color: theme.accentOne,
		fontFamily: theme.textTwo,
		textAlign: 'center',
		marginTop: 10
	},
	messages: {
		fontSize: 16,
		fontFamily: theme.textMain,
		color: theme.primary,
		margin: 10
	}
});
