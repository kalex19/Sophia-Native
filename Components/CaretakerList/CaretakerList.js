import React, { Component } from 'react';
import { styles } from './styleCaretakerList';
import { Text, View, ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { loadLists } from '../../actions';
import { fetchCaretakerLists } from '../../Utils/caretakerApiCalls';
import { PropTypes } from 'prop-types';
import Header from '../common/Header/Header';

export class CaretakerList extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = async () => {
		const { user } = this.props;
		const lists = await fetchCaretakerLists(user.id);
		this.props.loadLists(lists);
	};

	render() {
		const { lists } = this.props;
		const { user } = this.props;
		this.props.loadLists(lists);
		let allLists = lists
			.map(list => {
				list = { ...list, client_id: user.id };
				return (
					<View style={styles.lists} key={list.id} accessible={true}>
						<TouchableHighlight
							underlayColor="black"
							accessibilityLabel={`Tap me to navigate to your ${list.name} list. From there view your tasks.`}
							accessible={true}
						></TouchableHighlight>
						<View>
						<Text
							style={styles.listName}
							onPress={() => {
								this.props.navigation.navigate('Tasks', list);
							}}
						>
							{list.name}
						</Text>
						<Text style={styles.name}>
							Client: {list.client_name}
						</Text>
						</View>
					</View>
				);
			})
			.reverse();
		return (
			<View>
				<Header accessibilityLabel="My Todo Lists">My Todo Lists</Header>
				<ScrollView>{allLists}</ScrollView>
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
)(CaretakerList);

CaretakerList.propTypes = {
	lists: PropTypes.array,
	user: PropTypes.object,
	loadLists: PropTypes.func
};
