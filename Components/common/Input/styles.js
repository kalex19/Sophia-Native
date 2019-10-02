import { StyleSheet } from 'react-native';
import theme from '../../../theme';
export default StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		paddingTop: 18
	},
	input: {
		alignSelf: 'flex-start',
		width: '65%',
		borderRadius: 5,
		height: 70,
		fontSize: 30,
		fontFamily: theme.textTwo,
		paddingLeft: 15,
		margin: 10,
		backgroundColor: "transparent",
		color: theme.primary,
		borderColor: theme.accentTwo,
		borderStyle: "solid",
		borderBottomWidth: 2
	}
});
