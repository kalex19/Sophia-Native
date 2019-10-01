import { StyleSheet } from 'react-native';
import theme from '../../theme';
export default StyleSheet.create({
	scrollContainer: {
		width: '100%'
	},
	infoContainer: {
		backgroundColor: theme.accentOne,
		borderColor: theme.primary,
		borderRadius: 5,
		borderWidth: 5,
		margin: 10,
		padding: 10,
		width: '90%',
		alignSelf: 'center',
		textAlign: 'center'
	},
	text: {
		color: theme.accentTwo,
		fontSize: 30,
		fontFamily: theme.textMain
	}
});
