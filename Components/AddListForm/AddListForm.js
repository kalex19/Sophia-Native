import React, { Component } from 'react';
import { View, Picker, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { addList } from '../../actions';
import { postList } from '../../Utils/clientApiCalls';
import { PropTypes } from 'prop-types';
import { fetchCaretakers } from '../../Utils/clientApiCalls';
import { fetchClients } from '../../Utils/clientApiCalls';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import Header from '../common/Header/Header';

export class AddListForm extends Component {
	state = {
		list_title: '',
		list_edit_input: '',
		displayEdit: '',
		caretaker_id: 0,
		caretakers: [],
		client_id: 0,
		clients: []
	};
	componentDidMount = async () => {
		const caretakers = await fetchCaretakers();
		this.setState({ caretakers });
		const clients = await fetchClients();
		this.setState({ clients });
	};
	saveRecordedText = text => {
		this.setState({ list_title: text });
	};
	handleChange = input => {
		this.setState({ list_title: input });
	};
	handleEditList = input => {
		this.setState({ list_edit_input: input });
	};
	handleSubmit = async () => {
		const { list_title, caretaker_id, client_id } = this.state;
		const { user } = this.props;
		let listData = {
			name: list_title,
			caretaker_id,
			client_id,
			key: user.id
		};
		try {
			const list = await postList(listData, user);
			this.setState({ list_title: '', caretaker_id: 0, client_id: 0 });
			this.props.addList(list);
			this.props.navigation.navigate('NeedDone');
		} catch (error) {
			console.log(error);
		}
	};

	createNewList = () => {
		const allCaretakers = this.state.caretakers.map(caretaker => {
			return <Picker.Item label={caretaker.name} value={caretaker.id} key={caretaker.id} />;
		});
		const allClients = this.state.clients.map(client => {
			return <Picker.Item label={client.name} value={client.id} key={client.id} />;
		});
		return (
			<View style={{ justifyContent: 'center' }}>
				<Input
					label="List Name"
					value={this.state.list_title}
					onChangeText={text => this.handleChange(text)}
					accessibilityLabel="List Name Input"
				/>
				<View>
					{this.props.user.role === 'client' && (
						<Picker
							selectedValue={this.state.caretaker_id}
							style={{ width: '85%', borderColor: 'maroon', borderWidth: 1, alignSelf: 'center' }}
							onValueChange={itemValue => this.setState({ caretaker_id: itemValue, client_id: user.id })}
						>
							<Picker.Item label="-- Select A Caretaker --" value={0} />
							{allCaretakers}
						</Picker>
					)}
					{this.props.user.role === 'caretaker' && (
						<Picker
							selectedValue={this.state.client_id}
							style={{ width: '85%', borderColor: 'maroon', borderWidth: 1, alignSelf: 'center' }}
							onValueChange={itemValue => this.setState({ client_id: itemValue, caretaker_id: user.id })}
						>
							<Picker.Item label="-- Select A Client --" value={0} />
							{allClients}
						</Picker>
					)}
				</View>
				<Button
					accessibilityLabel="Tap me to submit the title of your list."
					disabled={this.state.isLoading}
					onPress={this.handleSubmit}
				>
					Submit List
				</Button>
			</View>
		);
	};
	render() {
		return (
			<View>
				<Header>Add New List</Header>
				<ScrollView>
					{this.createNewList()}
					<View style={{ height: 550 }}></View>
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
	addList: list => dispatch(addList(list))
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddListForm);

AddListForm.propTypes = {
	lists: PropTypes.array,
	user: PropTypes.object
};
