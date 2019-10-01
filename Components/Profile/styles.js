import { StyleSheet } from 'react-native';
import theme from '../../theme';
export default StyleSheet.create({
	userInfoHeader: {
		fontSize: 30,
		fontFamily: theme.textMain,
		margin: 5,
		alignSelf: 'center',
		textAlign: 'center',
		width: '100%'
	},
	userInfo: {
		fontSize: 20,
		fontFamily: theme.textTwo,
		margin: 5,
		alignSelf: 'center',
		textAlign: 'center',
		width: '100%'
	},
	addressContainer: {
		display: 'flex',
		flexDirection: 'column'
	},
	infoContainer: {
		borderColor: theme.primary,
		borderRadius: 5,
		borderWidth: 2,
		margin: 10,
		width: '90%',
		textAlign: 'center',
		alignSelf: 'center',
	},
	image: {
		borderRadius: 50,
		borderColor: theme.primary,
		width: '50%',
		height: 200,
		margin: 5,
		alignSelf: 'center'
	},
	scrollContainer: {
		width: '90%'
	}
});
