import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: theme.accentOne,
		flex: 1,
		justifyContent: 'center'
	},
	logoContainer: {
		borderBottomColor: theme.primary,
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: 30
	},
	logo: {
		fontFamily: theme.textMain,
		fontSize: 60
	}
});
