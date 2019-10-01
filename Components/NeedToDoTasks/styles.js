import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
	lists: {
		backgroundColor: theme.primary,
		alignItems: 'center',
		margin: 5,
		padding: 10,
		width: '90%',
		borderRadius: 20,
		alignSelf: 'center'
	},
	listHeader: {
		marginBottom: 20,
		padding: 10
	}
});
