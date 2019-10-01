import { StyleSheet } from 'react-native';
import theme from '../../../theme';

export default StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'center',
		margin: 10,
	},
	name: {
		color: theme.accentTwo,
		fontSize: 25,
		fontFamily: theme.textMain
	}
});
