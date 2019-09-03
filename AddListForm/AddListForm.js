import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

class AddListForm extends Component {
  state = {
    list_title_input: '',
    item_input: '',
    note_input: '',

  }

  render() {
    return(
      <View style={styles.list}>
        <View>
          <Text>Add List Title</Text>
          <TextInput style={styles.input}></TextInput>
          <Button title="ADD TITLE"/>
        </View>
        <View>
          <Text>Add Item</Text>
          <TextInput style={styles.input}></TextInput>
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
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 30,
    borderColor: 'grey',
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: 'white'
  }
});