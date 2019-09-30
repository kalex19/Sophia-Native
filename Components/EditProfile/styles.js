import { StyleSheet } from 'react-native';
import theme from '../../theme';
export default StyleSheet.create({
	userInfo: {
		fontSize: 20,
		fontFamily: theme.textTwo,
		marginTop: 10,
		marginBottom: 10,
		color: theme.accentOne,
		textAlign: 'left',
		alignSelf: 'center',
		width: '85%',
		borderColor: theme.primary,
		borderBottomWidth: 1,
		display: 'flex',
		flexDirection: 'column'
	},
	infoContainer: {
		backgroundColor: theme.primary,
		marginTop: 10,
		marginBottom: 10,
		padding: 10
	},
});
