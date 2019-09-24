import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { loadLists } from '../../actions';
import { PropTypes } from 'prop-types';
import styles from './styleUserHomeScreen';
import Button from '../common/Button/Button';

export class UserHomeScreen extends Component {
	render() {
		const { user, navigation } = this.props;

		return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.header} accessibilityLabel="Speech Operated Personal Household Interactive Assistant">
						SOPHIA
					</Text>
				</View>
				<Text style={styles.greeting}>Welcome Back, {'\n' + user.name}!</Text>
				<Button
					accessibilityLabel="Tap me to navigate to your profile. From there, view your personal information"
					onPress={() => navigation.navigate('Profile', user)}
				>
					My Account
				</Button>
				<Button
					accessibilityLabel="Tap me to navigate to your todo lists. From there view or create your tasks."
					onPress={() => {
						user.role === 'client' ? navigation.navigate('ClientList') : navigation.navigate('CaretakerList');
					}}
				>
					My Lists
				</Button>
			</View>
		);
	}
}

export const mapStateToProps = state => ({
	user: state.userAccount,
	lists: state.lists
});

export const mapDispatchToProps = dispatch => ({
	loadLists: lists => dispatch(loadLists(lists))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserHomeScreen);

UserHomeScreen.propTypes = {
	userAccount: PropTypes.object,
	lists: PropTypes.array
};
