import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { loadLists } from '../../actions';
import { PropTypes } from 'prop-types';
import styles from './styles';
import Button from '../common/Button/Button';
import { logOut } from '../../actions';

export class UserHomeScreen extends Component {
	logOut = () => {
		this.props.logOut();
		this.props.navigation.navigate('Home');
	};

	render() {
		const { user, navigation } = this.props;
		return (
			<View style={styles.container}>
				<Header accessibilityLabel="Speech Operated Personal Household Interactive Assistant">SOPHIA</Header>
				<Text style={styles.greeting}>Welcome Back, {'\n' + user.name}!</Text>
				<Button
					accessibilityLabel="Tap me to navigate to your profile. From there, view your personal information"
					onPress={() => navigation.navigate('Profile', user)}
				>
					Edit Profile
				</Button>
				<Button
					accessibilityLabel="Tap me to navigate to your todo lists. From there view or create your tasks."
					onPress={() => {
						user.role === "client" ? navigation.navigate('ClientList') : navigation.navigate('CaretakerList');
					}}
				>
					My Lists
				</Button>
				<Button
					accessibilityLabel="Tap me to navigate to your todo lists. From there view or create your tasks."
					onPress={() => {
						navigation.navigate('Tasks');
					}}
				>
					My Tasks
				</Button>
				<Button accessibilityLabel="Tap to log out" onPress={this.logOut} style={{ borderRadius: 5 }}>
					Log Out
				</Button>
			</View>
		);
	}
}
export const mapStateToProps = state => ({
	user: state.userAccount,
	lists: state.lists,
	tasks: state.tasks
});
export const mapDispatchToProps = dispatch => ({
	loadLists: lists => dispatch(loadLists(lists)),
	loadTasks: tasks => dispatch(loadTasks(tasks)),
	logOut: () => dispatch(logOut())
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserHomeScreen);

UserHomeScreen.propTypes = {
	userAccount: PropTypes.object,
	lists: PropTypes.array,
	tasks: PropTypes.array
};
