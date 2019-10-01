import { StyleSheet } from 'react-native';
import theme from '../../../theme';

export default StyleSheet.create({
	container: {
		width: '20%'
	},
	button: {
		alignItems: 'center',
		alignSelf: 'center',
    borderRadius: 50,
    borderColor: theme.primary,
    borderWidth: 5,
		height: 60,
		justifyContent: 'center',
		margin: 10,
    width: '100%',
	},
	mic: {
    height: 20,
    width: 20
  }
});
