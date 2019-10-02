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
		// zIndex: 1,
		borderRadius: 5,
		height: 70,
		fontSize: 30,
		fontFamily: theme.textTwo,
		paddingLeft: 15,
		margin: 10,
		// backgroundColor: theme.accentThree,
		backgroundColor: "transparent",
		color: theme.accentTwo,
		borderColor: "black",
		borderStyle: "solid",
		borderBottomWidth: 2
	}
});
