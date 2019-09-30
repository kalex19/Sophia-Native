import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
	lists: {
		backgroundColor: theme.primary,
		alignItems: 'center',
		margin: 20,
		marginBottom: 1,
		marginTop: 1,
		padding: 10,
		width: '90%',
		borderRadius: 20
	},
	listHeader: {
		borderColor: theme.primary,
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginBottom: 20,
		padding: 10
	}
});
