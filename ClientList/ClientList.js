import React, { Component } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

class ClientList extends Component {
  state = {
    addList: false
  };

  toggleAddList = () => {
    this.setState({ addList: !this.state.addList });
  };

  render() {
    const allLists = this.props.navigation.state.params.map(list => {
      return (
        <View style={styles.lists} key={list.id}>
          <TouchableHighlight
            underlayColor="black"
            accessibilityLabel={`Tap me to navigate to your ${list.name} list. From there view or create your tasks.`}
            accessible={true}
            onPress={() =>
              this.props.navigation.navigate("IndividualList", list)
            }
          >
            <Text style={styles.listName}>{`${list.name}`}</Text>
          </TouchableHighlight>
        </View>
      );
    });
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>My Todo Lists</Text>
        </View>
        {allLists}
        <TouchableHighlight
          underlayColor="black"
          accessibilityLabel="Tap me to navigate to your todo lists. From there view or create your tasks."
          accessible={true}
          onPress={this.toggleAddList}
          style={styles.addListContainer}
        >
          <Text style={styles.listName}> + ADD NEW LIST </Text>
        </TouchableHighlight>
        {this.state.addList && (
          <View style={styles.align} >
            <TextInput style={styles.input} placeholder="List name"></TextInput>
            <TouchableHighlight
              underlayColor="black"
              accessibilityLabel="Tap me to submit the title of your list."
              accessible={true}
              onPress={this.addList}
              style={styles.addListContainer}
            >
              <Text style={styles.plus}> + </Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
    );
  }
}

export default ClientList;

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
    alignItems: "center",
    marginRight: 30,
    marginLeft: 30,
    padding: 20,
    borderRadius: 40,
    width: "80%",
    justifyContent: "center"
  },
  lists: {
    backgroundColor: "maroon",
    alignItems: "center",
    margin: 10,
    padding: 20
  },
  listName: {
    color: "white",
    fontSize: 20,
    fontFamily: "Didot"
  },
  input: {
    height: 70,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    fontSize: 40,
    textAlign: "center"
  },
  align: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  plus: {
    fontSize: 30,
    color: 'white',
  }
});
