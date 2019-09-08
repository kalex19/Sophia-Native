import React, { Component } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { loadLists } from "../../actions";
import { fetchLists, postList, deleteList, patchList } from "../../apiCalls";

class ClientList extends Component {
  state = {
    displayEdit: "",
    list_title: "",
    list_edit_input: ""
  };

  componentDidMount = async () => {
    await this.returnUpdatedList();
  };

  returnUpdatedList = async () => {
    const lists = await fetchLists();
    this.props.loadLists(lists);
  };

  toggleEditName = (list_id) => {
    this.setState({ displayEdit: list_id });
  };

  handleChange = input => {
    this.setState({ list_title: input });
  };

  handleEditList = input => {
    this.setState({ list_edit_input: input });
  };

  handleSubmit = async newList => {
    const { list_title } = this.state;
    newList = { name: list_title };
    await postList(newList);
    await this.returnUpdatedList();
    this.setState({ list_title: "" });
  };

  eraseList = async listId => {
    await deleteList(listId);
    await console.log("WHAT")
    this.returnUpdatedList();
  };

  handleSubmitEdit = async listId => {
    const { list_edit_input } = this.state;
    const modifiedList = { name: list_edit_input };
    await patchList(modifiedList, listId);
    this.returnUpdatedList();
    this.setState({ list_edit_input: "", displayEdit: false });
  };

  render() {
    const { lists } = this.props;
    const { navigation } = this.props;
    const allLists = lists.map(list => {
      return (
        <View style={styles.lists} key={list.id}>
          <TouchableHighlight
            underlayColor="black"
            accessibilityLabel={`Tap me to navigate to your ${list.name} list. From there view or create your tasks.`}
            accessible={true}
          ></TouchableHighlight>
          {this.state.displayEdit !== list.id && (
            <Text
              style={styles.listName}
              onPress={() => {
                navigation.navigate("IndividualList", list);
              }}
            >
              {list.name}
            </Text>
          )}
          {this.state.displayEdit === list.id && (
            <View style={styles.align}>
              <TextInput
                style={styles.input}
                placeholder="New name"
                value={this.state.list_edit_input}
                onChangeText={this.handleEditList}
              ></TextInput>
              <TouchableHighlight
                underlayColor="black"
                accessibilityLabel="Tap me to submit your edited list name."
                accessible={true}
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
              accessible={true}
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
    }).reverse();
    return (
      <View>
      <View style={styles.headerContainer}>
          <Text style={styles.header}>My Todo Lists</Text>
        </View>
          <View style={styles.addListContainer}>
            <TextInput
              style={styles.input}
              placeholder="List name"
              value={this.state.list_title}
              onChangeText={this.handleChange}
            ></TextInput>
            <TouchableHighlight
              underlayColor="black"
              accessibilityLabel="Tap me to submit the title of your list."
              accessible={true}
              onPress={() => this.handleSubmit()}
            >
              <Text style={styles.plus}> + </Text>
            </TouchableHighlight>
          </View>
        <View>{allLists}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    borderColor: "maroon",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    padding: 10
  },
  header: {
    fontSize: 40,
    fontFamily: "Didot",
    textAlign: "center"
  },
  addListContainer: {
    backgroundColor: "maroon",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 5,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: "space-between"
  },
  lists: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "maroon",
    alignItems: "center",
    margin: 10,
    marginBottom: 1,
    marginTop: 1,
    padding: 10
  },
  listName: {
    color: "white",
    fontSize: 40,
    fontFamily: "Didot"
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 40,
    textAlign: "center",
    backgroundColor: "white",
    width: "85%",
    fontFamily: "Didot",
  },
  align: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "85%",
    borderWidth: 1,
    borderColor: "white"
  },
  plus: {
    fontSize: 50,
    color: "white"
  },
  listItem: {
    fontSize: 25,
    color: "white",
    padding: 5
  },
  editItem: {
    fontSize: 15,
    color: "white",
    fontFamily: "Didot",
  },
  vertically: {
    flexDirection: "column",
    alignItems: "center"
  }
});

export const mapStateToProps = state => ({
  lists: state.lists
});

export const mapDispatchToProps = dispatch => ({
  loadLists: lists => dispatch(loadLists(lists))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientList);
