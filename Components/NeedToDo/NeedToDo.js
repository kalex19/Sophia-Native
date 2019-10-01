import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { loadLists } from '../../actions';
import { fetchAllLists } from '../../Utils/fetchAllLists';
import { PropTypes } from 'prop-types';
import Header from '../common/Header/Header';
import { NeedToDoList } from '../common/NeedToDoList/NeedToDoList';
import styles from './styles';

export class NeedToDo extends Component {
	componentDidMount = async () => {
		await this.fetchLists();
	};

	fetchLists = async () => {
		lists = await fetchAllLists(this.props.user.role, this.props.user.id);
		this.props.loadLists(lists);
	};

	getClientLists = () => {
		const { lists, user, navigation } = this.props;
		const filteredLists = lists.filter(list => list.created_for === 'client');
		console.log('filteredLists', filteredLists);
		if (filteredLists.length) {
			return filteredLists
				.map(list => {
					list = { ...list, role: 'client' };
					return <NeedToDoList list={list} navigation={navigation} />;
				})
				.reverse();
		} else {
			return <Text style={styles.text}>No Assigned Lists Yet!</Text>;
		}
	};

	getCaretakerLists = () => {
		const { lists, user, navigation } = this.props;
		const filteredLists = lists.filter(list => list.created_for === 'caretaker');
		if (filteredLists.length) {
			return filteredLists
				.map(list => {
					list = { ...list, role: 'caretaker' };
					return <NeedToDoList list={list} navigation={navigation} />;
				})
				.reverse();
		} else {
			return <Text style={styles.text}>No Assigned Lists Yet!</Text>;
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<Header accessibilityLabel="Lists for me to complete">Lists Assigned To Me</Header>
				<ScrollView>
					{this.props.user.role === 'client' && this.getClientLists()}
					{this.props.user.role === 'caretaker' && this.getCaretakerLists()}
				</ScrollView>
			</View>
		);
	}
}

export const mapStateToProps = state => ({
	lists: state.lists,
	user: state.userAccount
});

export const mapDispatchToProps = dispatch => ({
	loadLists: lists => dispatch(loadLists(lists))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NeedToDo);

NeedToDo.propTypes = {
	lists: PropTypes.array,
	user: PropTypes.object
};
