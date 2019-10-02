import React, { Component } from 'react';
import styles from './styles';
import { Text, View, ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { loadLists } from '../../actions';
import { fetchAllLists } from '../../Utils/fetchAllLists';
import { PropTypes } from 'prop-types';
import Button from '../common/Button/Button';
import Header from '../common/Header/Header';
import { NeedDoneList } from '../common/NeedDoneList/NeedDoneList';
import { deleteList, patchList } from '../../Utils/caretakerApiCalls';

export class NeedDone extends Component {
	state = {
		displayEdit: false,
		list_edit_input: ''
	};

	componentDidMount = async () => {
		await this.fetchLists();
	};

	fetchLists = async () => {
		const { user } = this.props;
		lists = await fetchAllLists(user.role, user.id);
		this.props.loadLists(lists);
	};

	getCaretakerCreatedLists = () => {
		const { lists, navigation } = this.props;
		const filteredLists = lists.filter(list => list.created_for === 'client');
		if (filteredLists.length) {
			return filteredLists
				.map(list => {
					list = { ...list, role: 'caretaker' };
					return <NeedDoneList list={list} navigation={navigation} />;
				})
				.reverse();
		} else {
			return <Text style={styles.text}>No Lists Yet!</Text>;
		}
	};

	toggleEditName = list_id => {
		this.setState({ displayEdit: list_id });
	};

	handleEditList = input => {
		this.setState({ list_edit_input: input });
	};

	eraseList = async listId => {
		const { user } = this.props;
		await deleteList(user.id, listId);
		this.fetchLists();
	};

	handleSubmitEdit = async listId => {
		const { list_edit_input } = this.state;
		const { user } = this.props;
		if (user.role === 'client') {
			const updatedList = {
				name: list_edit_input,
				list_id: listId,
				client_id: user.id
			};
		} else {
			const updatedList = {
				name: list_edit_input,
				list_id: listId,
				caretaker_id: user.id
			};
		}
		await patchList(updatedList);
		this.fetchLists();
		this.setState({ list_edit_input: '', displayEdit: false });
	};

	getClientCreatedLists = () => {
		const { lists, user, navigation } = this.props;
		const filteredLists = lists.filter(list => list.created_for === 'caretaker');
		if (filteredLists.length) {
			return filteredLists
				.map(list => {
					list = { ...list, role: 'client' };
					return (
						<View style={styles.lists} key={list.id} accessible={true}>
							<TouchableHighlight
								underlayColor="black"
								accessibilityLabel={`Tap me to navigate to your ${list.name} list. From there view or create your tasks.`}
								accessible={true}
							>
								{this.state.displayEdit !== list.id && (
									<Text
										style={styles.listName}
										onPress={() => {
											this.props.navigation.navigate('NeedDoneTasks', list);
										}}
									>
										{list.name}
									</Text>
								)}
							</TouchableHighlight>
							{this.state.displayEdit === list.id && (
								<View style={styles.align}>
									<Input label="New name" value={this.state.list_edit_input} onChangeText={this.handleEditList} saveRecordedText={text => this.handleEditList(text)}/>
									<Button
										accessibilityLabel="Tap me to submit your edited list name."
										onPress={() => this.handleSubmitEdit(list.id)}
									>
										✔︎
									</Button>
								</View>
							)}
							<View style={styles.vertically}>
								<TouchableHighlight
									underlayColor="black"
									accessibilityLabel="Tap me to open form and edit your list name."
									onPress={() => this.toggleEditName(list.id)}
								>
									<Text style={styles.editItem}>✏️ EDIT</Text>
								</TouchableHighlight>
								<TouchableHighlight onPress={() => this.eraseList(list.id)}>
									<Text style={styles.editItem}>🗑 DELETE</Text>
								</TouchableHighlight>
							</View>
						</View>
					);
				})
				.reverse();
		} else {
			return <Text style={styles.text}>No Lists Yet!</Text>;
		}
	};

	render() {
		return (
			<View>
				<Header accessibilityLabel="My Todo Lists">My Todo Lists</Header>
				<ScrollView>
					<Button onPress={() => this.props.navigation.navigate('AddListForm')}>Add New List +</Button>
					{this.props.user.role === 'client' && this.getClientCreatedLists()}
					{this.props.user.role === 'caretaker' && this.getCaretakerCreatedLists()}
					<View style={{ height: 550 }} />
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
)(NeedDone);

NeedDone.propTypes = {
	lists: PropTypes.array,
	user: PropTypes.object
};
