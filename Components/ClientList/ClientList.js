import React, { Component } from 'react'
import {  StyleSheet,Text, View, TextInput, TouchableHighlight } from 'react-native';
import theme from '../../theme';

export default class List extends Component {
  constructor(){
    super();
    this.state = {
      list_edit_input: "",
      displayEdit: "",
    }
  }
  render() {
    return (
    <View style={styles.lists} key={list.id} accessible={true}>
        <TouchableHighlight
          underlayColor="black"
          accessibilityLabel={`Tap me to navigate to your ${list.name} list. From there view or create your tasks.`}
          accessible={true}
        ></TouchableHighlight>
        {this.state.displayEdit !== list.id && (
          <Text
            style={styles.listName}
            onPress={() => {
              navigation.navigate("Tasks", list);
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
       )
     }
   }
 //should mstp and mdtp for editing list

const styles = StyleSheet.create({
  editItem: {
    fontSize: 15,
    color: theme.accentOne,
    fontFamily: theme.textTwo,
  },
  vertically: {
    flexDirection: "column",
    alignItems: "center"
  },  
  listItem: {
    fontSize: 25,
    color: theme.accentOne,
    padding: 5
  },
  input: {
    borderColor: theme.accentThree,
    borderWidth: 1,
    fontSize: 40,
    textAlign: "center",
    backgroundColor: theme.accentOne,
    width: "85%",
    fontFamily: theme.textTwo,
  },
  align: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.accentOne
  },
  lists: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.primary,
    alignItems: "center",
    margin: 10,
    marginBottom: 1,
    marginTop: 1,
    padding: 10
  },
  listName: {
    color: theme.accentOne,
    fontSize: 40,
    fontFamily: theme.textTwo
  },
})

