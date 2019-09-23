import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
	headerContainer: {
		borderBottomColor: theme.primary,
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: 30
	},
	header: {
		fontSize: 50,
		fontFamily: theme.textMain
	},
	button: {
		color: theme.accentOne,
		fontSize: 30,
		fontFamily: theme.textTwo,
		textAlign: 'center',
		paddingTop: 25
	},
	container: {
		backgroundColor: theme.accentOne,
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	},
	routes: {
		flexDirection: 'column',
		backgroundColor: theme.primary,
		width: '80%',
		height: '15%',
		justifyContent: 'space-around',
		margin: 10,
		borderRadius: 50
	},
	touchExpander: {
		height: '100%',
		borderRadius: 50,
		width: '100%'
	}
});
