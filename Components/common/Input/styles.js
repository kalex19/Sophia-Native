import { StyleSheet } from 'react-native';
import theme from '../../../theme';

export default StyleSheet.create({
	container: {
		width: '100%'
	},
	input: {
		alignSelf: 'center',
		width: '85%',
		borderRadius: 5,
		height: 70,
		fontSize: 30,
		fontFamily: theme.textTwo,
		paddingLeft: 15,
		margin: 10,
		backgroundColor: theme.accentThree,
		color: theme.accentTwo
	}
});
