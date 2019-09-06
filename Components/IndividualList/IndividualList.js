import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { addTask, deleteTask, editTask } from "../../actions";

class IndividualList extends Component {
  constructor() {
    super();
    this.state = {
      addingTask: false,
      task_input: "",
      note_input: "",
      due_date: "",
      // completed: false
      displayEdit: false,
      task_edit_input: ""
    };
  }

  toggleEditName = (itemId) => {
    this.setState({ displayEdit: !this.state.displayEdit });
  };

  toggleAddTask = () => {
    this.setState({ addingTask: !this.state.addingTask });
  };

  handleChangeTask = input => {
    this.setState({ task_input: input });
  };

  handleChangeNote = input => {
    this.setState({ note_input: input });
  };

  handleChangeDate = input => {
    this.setState({ due_date: input });
  };

  handleEditTask = input => {
    this.setState({ task_edit_input: input })
    console.log(this.state.task_edit_input)
  }

  handleSubmitEdit = (taskId) => {
    const { task_edit_input } = this.state
    this.props.editTask(task_edit_input, taskId)
    this.setState({ task_edit_input: "", displayEdit: false })
  }

  handleSubmit = async newTask => {
    const { task_input, note_input, due_date } = this.state;
    newTask = {
      id: Date.now(),
      name: task_input,
      note: note_input,
      due_date: due_date,
      completed: false
    };
    await this.props.addTask(newTask);
    this.setState({ task_input: "", note_input: "", due_date: "" });
  };

  render() {
    let task;
    const list = this.props.navigation.state.params;
    // const list = this.props.items
    const allTasks = this.props.items.map(item => {
      return (
        <View>
          <Text>{item.name}</Text>
        </View>
      );
    });
    const noItems = (
      <View style={styles.listItemContainer} key={Math.random()}>
        <Text style={styles.listItem}>No Tasks</Text>
      </View>
    );
    const allItems = this.props.items.map(item => {
      return (
        <View style={styles.listItemContainer} key={Math.random()}>
          <View style={styles.listItemHeaderContainer}>
            <TouchableHighlight
              underlayColor="black"
              accessibilityLabel="Tap me to complete or uncomplete your todo task."
              accessible={true}
              onPress={() => this.toggleEditName()}
            >
              <Text style={styles.listItem}>Edit Task</Text>
              {/* <Text style={styles.listItem}>{item.completed ? "✔︎" : "x"}</Text> */}
            </TouchableHighlight>
            {!this.state.displayEdit && (
              <Text style={styles.listItemHeader}>{item.name}</Text>
            )}
            {this.state.displayEdit && (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Edit task"
                  value={this.state.task_edit_input}
                  onChangeText={this.handleEditTask}
                ></TextInput>
                <Button title="Edit" onPress={() => this.handleSubmitEdit(item.id)}/>
              </View>
            )}
            <TouchableHighlight
              underlayColor="black"
              accessibilityLabel="Tap me to delete your todo task."
              accessible={true}
              onPress={() => this.props.deleteTask(item.id)}
            >
              <Text style={styles.listItem}>🗑</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.listItemInfoContainer}>
            <Text style={styles.listItem}>
              {item.notes && `Note: ${item.notes}`}
            </Text>
            <Text style={styles.listItem}>
              {item.due_date && `Due: ${item.due_date}`}
            </Text>
          </View>
        </View>
      );
    });

    // if(!list.items.length){
    //   task = noItems
    // } else {
    //   task = allItems
    // }
    return (
      <View>
        <View style={styles.listHeader}>
          <Text style={styles.listName}>{list.name}</Text>
        </View>
        <TouchableHighlight
          underlayColor="black"
          accessibilityLabel="Tap me to add a task."
          accessible={true}
          onPress={this.toggleAddTask}
          style={styles.addTaskContainer}
        >
          <Text style={styles.addTask}> + ADD NEW TASK </Text>
        </TouchableHighlight>
        {this.state.addingTask && (
          <View>
            <View style={styles.align}>
              <TextInput
                style={styles.input}
                placeholder="Task name"
                value={this.state.task_input}
                onChangeText={this.handleChangeTask}
              ></TextInput>
              <TextInput
                style={styles.input}
                placeholder="Note"
                value={this.state.note_input}
                onChangeText={this.handleChangeNote}
              ></TextInput>
              <TextInput
                style={styles.input}
                placeholder="Due date: mm/dd"
                value={this.state.due_date}
                onChangeText={this.handleChangeDate}
              ></TextInput>
            </View>
            <TouchableHighlight
              underlayColor="black"
              accessibilityLabel="Tap me to submit your task."
              accessible={true}
              onPress={() => this.handleSubmit()}
            >
              <Text style={styles.plus}> + </Text>
            </TouchableHighlight>
          </View>
        )}
        <View style={styles.temporary}>{allItems}</View>
      </View>
    );
  }
}

export const mapStateToProps = state => ({
  items: state.items
});

export const mapDispatchToProps = dispatch => ({
  addTask: newTask => dispatch(addTask(newTask)),
  deleteTask: taskId => dispatch(deleteTask(taskId)),
  editTask: (nameToChange, taskId) => dispatch(editTask(nameToChange, taskId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndividualList);

const styles = StyleSheet.create({
  listHeader: {
    borderBottomColor: "maroon",
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 10
  },
  listName: {
    fontSize: 30,
    fontFamily: "Didot",
    margin: 10,
    textAlign: "center"
  },
  listItemHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10
  },
  listItemContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: "maroon"
  },
  listItemHeader: {
    textAlign: "center",
    fontSize: 35,
    color: "white",
    fontFamily: "Didot"
  },
  listItemInfoContainer: {
    flexDirection: "column"
  },
  listItem: {
    fontSize: 25,
    color: "white"
  },
  addTaskContainer: {
    backgroundColor: "maroon",
    alignItems: "center",
    marginRight: 30,
    marginLeft: 30,
    padding: 20,
    borderRadius: 40,
    width: "80%",
    justifyContent: "center"
  },
  addTask: {
    color: "white",
    fontSize: 20,
    fontFamily: "Didot"
  },
  input: {
    height: 70,
    borderColor: "gray",
    borderWidth: 1,
    margin: 2,
    fontSize: 25,
    textAlign: "center",
    width: 140
  },
  align: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  plus: {
    color: "white",
    backgroundColor: "maroon",
    width: 80,
    alignSelf: "center",
    textAlign: "center",
    height: 70,
    fontSize: 50
  },
  temporary: {
    backgroundColor: "pink",
    height: 400
  }
});

{
  /* {!list.items.length ? noItems : allItems} */
}
{
  /* {task} */
}
