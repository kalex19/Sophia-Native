import React, { Component } from 'react'
import {  StyleSheet,Text, View, TextInput, TouchableHighlight } from 'react-native';
import theme from '../../theme';
import {styles} from './styleClientList';

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

//proptypes
