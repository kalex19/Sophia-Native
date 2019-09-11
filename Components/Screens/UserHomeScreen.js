import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { loadLists } from '../../actions';
import { PropTypes } from 'prop-types';
import { styles } from './styleUserHomeScreen';

export class UserHomeScreen extends Component {
	render () {
		return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.header} accessibilityLabel="Speech Operated Personal Household Interactive Assistant">
						SOPHIA
					</Text>
				</View>
				<Text style={styles.greeting}>Welcome Back, {this.props.user.name}!</Text>
				<View style={styles.routes}>
					<TouchableHighlight
						underlayColor="black"
						accessibilityLabel="Tap me to navigate to your profile. From there, view your personal information"
						accessible={true}
						onPress={() => this.props.navigation.navigate('Profile', this.props.user)}
						style={styles.touchExpander}>
						<Text style={styles.button}>My Account</Text>
					</TouchableHighlight>
				</View>
				<View style={styles.routes}>
					<TouchableHighlight
						underlayColor="black"
						accessibilityLabel="Tap me to navigate to your todo lists. From there view or create your tasks."
						accessible={true}
						onPress={() => this.props.navigation.navigate('Lists', this.props.lists)}
						style={styles.touchExpander}>
						<Text style={styles.button}>My Lists</Text>
					</TouchableHighlight>
				</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserHomeScreen);

UserHomeScreen.propTypes = {
	userAccount: PropTypes.object,
	lists: PropTypes.array
};
