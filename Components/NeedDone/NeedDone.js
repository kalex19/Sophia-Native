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
import { deleteList, patchList } from '../../Utils/clientApiCalls';
import Input from '../common/Input/Input';
import theme from '../../theme';

export class NeedDone extends Component {
	state = {
		displayEdit: false,
		targetId: '',
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

	toggleEditName = list_id => {
		this.setState({ displayEdit: !this.state.displayEdit, targetId: list_id });
	};

	handleEditList = input => {
		this.setState({ list_edit_input: input });
	};

	getCaretakerCreatedLists = () => {
		const { lists, navigation } = this.props;
		const filteredLists = lists.filter(list => list.created_for === 'client');
		if (filteredLists.length) {
			return filteredLists
				.map(list => {
					list = { ...list, role: 'caretaker' };
					return (
					<View key={Math.random()}>
					<NeedDoneList list={list} navigation={navigation} targetId={this.state.targetId} eraseList={this.eraseList} toggleEditName={this.toggleEditName} list_edit_input={this.state.list_edit_input} displayEdit={this.state.displayEdit} handleSubmitEdit={this.handleSubmitEdit} handleEditList={this.handleEditList} />
					</View>
						);
				})
				.reverse();
		} else {
			return <Text style={styles.text}>No Lists Yet!</Text>;
		}
	};


	eraseList = async listId => {
		const { user } = this.props;
		await deleteList(listId);
		this.fetchLists();
	};

	handleSubmitEdit = async listId => {
		const { list_edit_input } = this.state;
			const updatedList = {
				name: list_edit_input,
			};
		await patchList(updatedList, listId);
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
					return <NeedDoneList key={Math.random()} list={list} navigation={navigation} targetId={this.state.targetId} eraseList={this.eraseList} toggleEditName={this.toggleEditName} list_edit_input={this.state.list_edit_input} displayEdit={this.state.displayEdit} handleSubmitEdit={this.handleSubmitEdit} handleEditList={this.handleEditList} />
				})
		} else {
			return <Text style={styles.text}>No Lists Yet!</Text>;
		}
	};

	render() {
		return (
			<View style={theme.container}>
				<Header accessibilityLabel="My Todo Lists">My Todo Lists</Header>
				<ScrollView>
					<Button onPress={() => this.props.navigation.navigate('AddListForm')}>Add New List +</Button>
					<View style={{borderBottomColor: "black", borderBottomWidth: `{}`}}></View>
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
