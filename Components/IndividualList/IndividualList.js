import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { loadTasks } from "../../actions";
import { fetchTasks, postTask, patchTask, deleteTask } from "../../Utils/apiCalls";

class IndividualList extends Component {
  state = {
    task_input: "",
    description_input: "",
    due_date: "",
    displayEdit: "",
    task_edit_input: ""
  };

  componentDidMount = async () => {
    await this.returnUpdatedTask();
  };

  returnUpdatedTask = async () => {
    const clientId = this.props.navigation.state.params.client_id
    const list_id = this.props.navigation.state.params.id;
    const tasks = await fetchTasks(list_id, clientId);
    const cleanedTasks = tasks.map(task => {
      return {
        id: task.id,
        name: task.name,
        description: task.description,
        list_id: task.list_id,
        due_date: task.due_date
      }
    })
    this.props.loadTasks(cleanedTasks);
  };

  toggleEditName = (task_id) => {
    this.setState({ displayEdit: task_id });
  };

  handleChangeTask = input => {
    this.setState({ task_input: input });
  };

  handleChangeNote = input => {
    this.setState({ description_input: input });
  };

  handleChangeDate = input => {
    this.setState({ due_date: input });
  };

  handleEditTask = input => {
    this.setState({ task_edit_input: input });
  };

  handleSubmitEdit = async taskId => {
    const list_id = this.props.navigation.state.params.id;
    const clientId = this.props.navigation.state.params.client_id
    const { task_edit_input } = this.state;
    const modifiedTask = { name: task_edit_input };
    await patchTask(modifiedTask, list_id, taskId, clientId);
    await this.returnUpdatedTask();
    this.setState({ task_edit_input: "", displayEdit: false });
  };

  handleSubmit = async newTask => {
    const list_id = this.props.navigation.state.params.id;
    const { task_input, description_input, due_date } = this.state;
    const clientId = this.props.navigation.state.params.client_id
    newTask = {
      name: task_input,
      description: description_input,
      due_date: due_date
    };
    await postTask(newTask, list_id, clientId);
    await this.returnUpdatedTask();
    this.setState({ task_input: "", description_input: "", due_date: "" });
  };

  eraseTask = async taskId => {
    const clientId = this.props.navigation.state.params.client_id
    const list_id = this.props.navigation.state.params.id;
    await deleteTask(list_id, taskId, clientId);
    this.returnUpdatedTask();
  };

  render() {
    const list = this.props.navigation.state.params;
    console.log(list)
    const { tasks } = this.props;
    const noItems = (
      <View key={Math.random()}>
        <Text style={styles.listItem}>No Tasks</Text>
      </View>
    );
    const allTasks = tasks.map(task => {
      return (
        <View style={styles.lists}>
          <View style={styles.listItemHeaderContainer}>
            {this.state.displayEdit !== task.id && (
              <View style={styles.taskNoteDue}>
              <Text style={styles.listItemHeader}>{task.name}</Text>
              {task.description.length > 0 && <Text style={styles.listItemSecond}>notes: {task.description}</Text>}
              {task.due_date !== null && <Text style={styles.listItemSecond}>due: {task.due_date}</Text>}
              </View>
            )}
            {this.state.displayEdit === task.id && (
              <View style={styles.alignEdit}>
                <TextInput
                  style={styles.inputEdit}
                  placeholder="Edit task"
                  value={this.state.task_edit_input}
                  onChangeText={this.handleEditTask}
                ></TextInput>
                <TouchableHighlight
                  underlayColor="black"
                  accessibilityLabel="Tap me to submit your edited todo task."
                  accessible={true}
                  onPress={() => this.handleSubmitEdit(task.id)}
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
                onPress={() => this.toggleEditName(task.id)}
              >
                <Text style={styles.editItem}>✏️</Text>
                {/* <Text style={styles.listItem}>{task.completed ? "✔︎" : "x"}</Text> */}
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="black"
                accessibilityLabel="Tap me to delete your todo task."
                accessible={true}
                onPress={() => this.eraseTask(task.id)}
              >
                <Text style={styles.editItem}>DEL</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      );
    }).reverse();
    return (
      <View>
        <View style={styles.listHeader}>
          <Text style={styles.listName}>{list.name}</Text>
        </View>
        <View style={styles.addTaskContainer}>
          <View style={styles.align}>
            <Text style={styles.label}>Task name:</Text>
            <TextInput
              style={styles.input}
              value={this.state.task_input}
              onChangeText={this.handleChangeTask}
            ></TextInput>
            <Text style={styles.label}>Note:</Text>
            <TextInput
              style={styles.input}
              value={this.state.description_input}
              onChangeText={this.handleChangeNote}
            ></TextInput>
            <Text style={styles.label}>Due:</Text>
            <TextInput
              style={styles.input}
              placeholder="mm/dd"
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
        <View>{allTasks}</View>
      </View>
    );
  }
}

export const mapStateToProps = state => ({
  tasks: state.tasks
});

export const mapDispatchToProps = dispatch => ({
  loadTasks: tasks => dispatch(loadTasks(tasks))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndividualList);

const styles = StyleSheet.create({
  listHeader: {
    borderColor: "maroon",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    padding: 10
  },
  listName: {
    fontSize: 40,
    fontFamily: "Didot",
    textAlign: "center"
  },
  listItemHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "maroon",
    alignItems: "center",
    width: "100%"
  },
  listItemHeader: {
    textAlign: "center",
    fontSize: 40,
    color: "white",
    fontFamily: "Didot",
    width: "85%"
  },
  listItemSecond: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontFamily: "Didot",
    width: "85%"
  },
  listItem: {
    fontSize: 40,
    color: "white",
    padding: 8,
    paddingLeft: 12
  },
  addTaskContainer: {
    backgroundColor: "maroon",
    alignItems: "center",
    margin: 10,
    padding: 5,
    paddingLeft: 8,
    paddingRight: 0,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  input: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    margin: 2,
    fontSize: 40,
    fontFamily: "Didot",
    textAlign: "center",
    width: 320
  },
  label: {
    color: "white",
    fontSize: 20,
    fontFamily: "Didot"
  },
  align: {
    justifyContent: "center",
    alignItems: "center"
  },
  plus: {
    color: "white",
    backgroundColor: "maroon",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 50
  },
  vertically: {
    flexDirection: "column",
    alignItems: "center"
  },
  editItem: {
    fontSize: 15,
    color: "white",
    fontFamily: "Didot"
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
  alignEdit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    borderWidth: 1,
    borderColor: "white"
  },
  inputEdit: {
    width: "85%",
    backgroundColor: "white",
    fontSize: 38,
    fontFamily: "Didot"
  },
  taskNoteDue: {
    width: '85%'
  }
});
