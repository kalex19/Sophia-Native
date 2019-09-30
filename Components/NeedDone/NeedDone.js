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


import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { loadLists } from "../../actions";
import {
  fetchClientLists,
  deleteClientList,
  patchClientList
} from "../../Utils/clientApiCalls";
import {
  fetchCaretakerLists,
  deleteCaretakerList,
  patchCaretakerList
} from "../../Utils/caretakerApiCalls";
import { PropTypes } from "prop-types";
import { fetchCaretakers } from "../../Utils/clientApiCalls";
// import { fetchClients } from "../../Utils/clientApiCalls";
// Need to be able to get all clients
import Button from "../common/Button/Button";
import Header from "../common/Header/Header";
import List from '../common/Lists/Lists';

export class NeedToDo extends Component {
  state = {
    list_title: "",
    list_edit_input: "",
    displayEdit: "",
    caretaker_id: 0,
    caretakers: [],
    client_id: 0,
    clients: []
  };

  componentDidMount = async () => {
    await this.returnUpdatedList();
    if(this.props.user.role === 'client'){
      const caretakers = await fetchCaretakers();
      this.setState({ caretakers });
    } else {
      const clients = await fetchClient();
      this.setState({ clients });
    }
  };

  returnUpdatedList = async () => {
    if(this.props.user.role === 'client'){
      const lists = await fetchClientLists(this.props.user.id);
    } else {
      const lists = await fetchCaretakerLists(this.props.user.id);
    }
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
    if(this.props.user.role === 'client'){
    await deleteClientList(user.id, listId);
    } else {
      await deleteCaretakerList(user.id, listId);
    }
    this.returnUpdatedList();
  };

  handleSubmitEdit = async listId => {
    const { list_edit_input } = this.state;
    const { user } = this.props;
    if(this.props.user.role === 'client'){
    const updatedList = {
      name: list_edit_input,
      list_id: listId,
      client_id: user.id
    };
    await patchClientList(updatedList);
  } else {
    const updatedList = {
      name: list_edit_input,
      list_id: listId,
      caretaker_id: user.id
    };
    await patchCaretakerList(updatedList);
  }
    this.returnUpdatedList();
    this.setState({ list_edit_input: "", displayEdit: false });
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
                <View>
                  <Text
                    style={styles.listName}
                    onPress={() => {
                      this.props.navigation.navigate("Tasks", list);
                    }}
                  >
                    {list.name}
                  </Text>
									<Text style={styles.name}>
										Caretaker: {list.caretaker_name}
									</Text>
                </View>
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

  getCaretakerLists = () => {
    const { lists, user } = this.props;
    return lists
      .map(list => {
        list = { ...list, caretaker_id: user.id };
        return (
          <View style={styles.lists} key={list.id} accessible={true}>
          <Button></Button>
            <TouchableHighlight
              underlayColor="black"
              accessibilityLabel={`Tap me to navigate to your ${list.name} list. From there view or create your tasks.`}
              accessible={true}
            >
              {this.state.displayEdit !== list.id && (
                <View>
                  <Text
                    style={styles.listName}
                    onPress={() => {
                      this.props.navigation.navigate("Tasks", list);
                    }}
                  >
                    {list.name}
                  </Text>
									<Text style={styles.name}>
										Caretaker: {list.caretaker_name}
									</Text>
                </View>
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
          <Button onPress={() => this.props.navigation.navigate("AddListForm")}>
            Add New List +
          </Button>
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
