import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

class AddListForm extends Component {
  state = {
    item_input: "",
    note_input: "",
    due_date: "",
    completed: false
  };

  render() {
    return (
      <View style={styles.list}>
        <View style={styles.box}>
          <TextInput
            style={styles.input}
            placeholder="Item name"
            onChangeText={textInput => this.setState({ item_input: textInput })}
            value={this.state.item_input}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Note"
            onChangeText={textInput => this.setState({ note_input: textInput })}
            value={this.state.note_input}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Due Date"
            onChangeText={textInput =>
              this.setState({ due_date_input: textInput })
            }
            value={this.state.due_date_input}
          ></TextInput>
          <Button title="+ Add Item" />
        </View>
      </View>
    );
  }
}

export default AddListForm;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 30,
    borderColor: "grey",
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: "white",
    width: "90%"
  },
  box: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    width: "90%",
    justifyContent: "center",
    alignItems: "center"
  }
});
