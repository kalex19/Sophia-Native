import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { loadLists } from '../../actions';
import { PropTypes } from 'prop-types';
import styles from './styleUserHomeScreen';
import Button from '../common/Button/Button';

export class UserHomeScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.header} accessibilityLabel="Speech Operated Personal Household Interactive Assistant">
						SOPHIA
					</Text>
				</View>
				<Text style={styles.greeting}>Welcome Back, {'\n' + this.props.user.name}!</Text>
				<Button
					accessibilityLabel="Tap me to navigate to your profile. From there, view your personal information"
					onPress={() => this.props.navigation.navigate('Profile', this.props.user)}
				>
					My Account
				</Button>
				<Button
					underlayColor="black"
					accessibilityLabel="Tap me to navigate to your todo lists. From there view or create your tasks."
					onPress={() => {
						this.props.user.role === 'client'
							? this.props.navigation.navigate('ClientList')
							: this.props.navigation.navigate('CaretakerList');
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
