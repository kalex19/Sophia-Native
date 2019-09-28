import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import theme from '../../theme';
import { connect } from 'react-redux';
import { loadLists } from '../../actions';
import { fetchClientLists } from '../../Utils/clientApiCalls';
import { fetchCaretakerLists } from '../../Utils/caretakerApiCalls';
import { PropTypes } from 'prop-types';
import { fetchCaretakers } from '../../Utils/clientApiCalls';
// import { fetchClients } from "../../Utils/clientApiCalls";
// Need to be able to get all clients
import Header from '../common/Header/Header';
import List from '../common/Lists/Lists';

export class NeedToDo extends Component {

	componentDidMount = async () => {
		await this.renderLists();
	};

	renderLists = async () => {
		if (this.props.user.role === 'client') {
			lists = await fetchClientLists(this.props.user.id);
			const caretakers = await fetchCaretakers();
			this.setState({ caretakers });
		} else {
			lists = await fetchCaretakerLists(this.props.user.id);
			const clients = await fetchClient();
			this.setState({ clients });
		}
		this.props.loadLists(lists);
	};

	getClientLists = () => {
		const { lists, user } = this.props;
		return lists
			.map(list => {
				list = { ...list, client_id: user.id };
				return <List {...props.list} />;
			})
			.reverse();
	};

	getCaretakerLists = () => {
		const { lists, user } = this.props;
		return lists
			.map(list => {
				list = { ...list, caretaker_id: user.id };
				return <List {...props.list} />;
			})
			.reverse();
	};

	render() {
		return (
			<View style={theme.container}>
				<Header accessibilityLabel="My Todo Lists">Lists Assigned To Me</Header>
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