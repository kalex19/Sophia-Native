import React, { Component } from 'react';
<<<<<<< HEAD
import { styles } from './styles';
import { Text, View, ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
=======
import { Text, View, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import styles from './styles';
>>>>>>> c370d070e70847cfd58f358b436c497c7b6e0a43
import { connect } from 'react-redux';
import { loadLists } from '../../actions';
import { fetchClientLists, deleteClientList, patchClientList } from '../../Utils/clientApiCalls';
import { Audio } from 'expo-av';
import { PropTypes } from 'prop-types';
import { fetchCaretakers } from '../../Utils/clientApiCalls';
import Button from '../common/Button/Button';
import Header from '../common/Header/Header';

export class NeedDone extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = async () => {
		await this.returnUpdatedList();
		const caretakers = await fetchCaretakers();
		this.setState({ caretakers });
	};

	returnUpdatedList = async () => {
		const lists = await fetchClientLists(this.props.user.id);
		this.props.loadLists(lists);
	};

	toggleEditName = list_id => {
		this.setState({ displayEdit: list_id });
	};

	handleEditList = input => {
		this.setState({ list_edit_input: input });
	};

	eraseList = async listId => {
		const { user } = this.props;
		await deleteClientList(user.id, listId);
		this.returnUpdatedList();
	};

	handleSubmitEdit = async listId => {
		const { list_edit_input } = this.state;
		const { user } = this.props;
		const updatedList = {
			name: list_edit_input,
			list_id: listId,
			client_id: user.id
		};
		await patchClientList(updatedList);
		this.returnUpdatedList();
		this.setState({ list_edit_input: '', displayEdit: false });
	};

	getClientLists = () => {
		const { lists, user } = this.props;
		return lists
			.map(list => {
				list = { ...list, client_id: user.id };
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
								<TextInput
									style={styles.input}
									placeholder="New name"
									value={this.state.list_edit_input}
									onChangeText={this.handleEditList}
								/>
								<TouchableHighlight
									underlayColor="black"
									accessibilityLabel="Tap me to submit your edited list name."
									onPress={() => this.handleSubmitEdit(list.id)}
								>
									<Text style={styles.listItem}>✔︎</Text>
								</TouchableHighlight>
							</View>
						)}
						<View style={styles.vertically}>
							<TouchableHighlight
								underlayColor="black"
								accessibilityLabel="Tap me to open form and edit your list name."
								onPress={() => this.toggleEditName(list.id)}
							>
								<Text style={styles.editItem}>✏️</Text>
							</TouchableHighlight>
							<TouchableHighlight onPress={() => this.eraseList(list.id)}>
								<Text style={styles.editItem}>DEL</Text>
							</TouchableHighlight>
						</View>
					</View>
				);
			})
			.reverse();
	};

	render() {
		return (
			<View>
				<Header accessibilityLabel="My Todo Lists">My Todo Lists</Header>
				<ScrollView>
					<Button onPress={() => this.props.navigation.navigate('AddListForm')}>Add New List +</Button>
					{this.getClientLists()}
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

