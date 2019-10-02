import { StyleSheet } from 'react-native';
import theme from '../../../theme';

export default StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		alignSelf: 'center',
		margin: 10,
		borderColor: theme.primary,
		borderWidth: 2,
	},
	name: {
		color: theme.accentTwo,
		fontSize: 25,
		fontFamily: theme.textMain
	},
	editItem: {
		fontSize: 20,
		color: theme.accentTwo,
		fontFamily: theme.textTwo,
		marginRight: 15
	},
	vertically: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
});
