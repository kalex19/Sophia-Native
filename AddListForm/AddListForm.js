import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

class AddListForm extends Component {
  state = {
    list_title_input: '',
    item_input: '',
    note_input: ''
  }

  render() {
    return(
      <View style={styles.list}>
        <View style={styles.box}>
          <TextInput style={styles.input} placeholder="Title of List"></TextInput>
          <Button title="ADD A TITLE TO THE LIST"/>
        </View>
        <View style={styles.box}>
          <TextInput style={styles.input} placeholder="Item name"></TextInput>
          <TextInput style={styles.input} placeholder="Note"></TextInput>
          <TextInput style={styles.input} placeholder="Due Date"></TextInput>
          <Button title="ADD ITEM"/>
        </View>
      </View>
    )
  }
}

export default AddListForm;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 30,
    borderColor: 'grey',
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: 'white',
    width: "90%"  
  },
  box: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    width: "90%",
    justifyContent: "center",
    alignItems: "center"
  }
});