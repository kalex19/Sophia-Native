import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import { loadTasks } from "../../actions";
import { fetchClientTasks, postClientTask, patchClientTask, deleteClientTask } from "../../Utils/clientApiCalls";
import { fetchCaretakerTasks, patchCaretakerTask } from "../../Utils/caretakerApiCalls";
import { TouchableHighlight } from "react-native-gesture-handler";
import { PropTypes } from 'prop-types';
import {styles} from './styleTasks';

export class Tasks extends Component {
  constructor(){
    super()
    this.state = {
      task_input: "",
      description_input: "",
      due_date: "",
      displayEdit: "",
      task_edit_input: "",
      completed: false
    };
  }

  componentDidMount = async () => {
    this.props.user.role === "caretaker" ? await this.returnUpdatedCaretakerTask() : this.returnUpdatedTask()
  };

  returnUpdatedCaretakerTask = async () => {
    const list = this.props.navigation.state.params
    const { user } = this.props
    const tasks = await fetchCaretakerTasks(list.id, user.id);
    this.props.loadTasks(tasks);
    console.log(this.props.tasks)
  };

  returnUpdatedTask = async () => {
    const list = this.props.navigation.state.params
    const { user } = this.props
    const tasks = await fetchClientTasks(list.id, user.id);
    this.props.loadTasks(tasks);
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
    const list = this.props.navigation.state.params
    const { user } = this.props
    const { task_edit_input } = this.state;
    const modifiedTask = { name: task_edit_input };
    await patchClientTask(modifiedTask, list.id, taskId, user.id);
    await this.returnUpdatedTask();
    this.setState({ task_edit_input: "", displayEdit: false });
  };

  handleSubmit = async newTask => {
    const list = this.props.navigation.state.params
    const { user } = this.props
    const { task_input, description_input, due_date } = this.state;
    newTask = {
      name: task_input,
      description: description_input,
      due_date: due_date
    };
    await postClientTask(newTask, list.id, user.id);
    await this.returnUpdatedTask();
    this.setState({ task_input: "", description_input: "", due_date: "" });
  };

  eraseTask = async taskId => {
    const list = this.props.navigation.state.params
    await deleteClientTask(list.id, taskId, client.id);
    this.returnUpdatedTask();
  };

  completeTaskByCaretaker = async taskId => {
    const list = this.props.navigation.state.params
    const { user } = this.props
    this.state.completed = !this.state.completed
    const { completed } = this.state
    const completedTask = { completed: completed };
    await patchCaretakerTask(completedTask, list.id, taskId, user.id);
    await this.returnUpdatedCaretakerTask();
  }

  render() {
    const { name } = this.props.navigation.state.params;
    const { tasks } = this.props;
    const allTasks = tasks.map(task => {
      return (
        <View style={styles.lists}>
          <View style={!task.completed ? styles.listItemHeaderContainer : styles.listItemHeaderContainerDONE}>
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
              {this.props.user.role === "client" && <View>
              <TouchableHighlight
                underlayColor="black"
                accessibilityLabel="Tap me to open form and edit your list name."
                accessible={true}
                onPress={() => this.toggleEditName(task.id)}
              >
                <Text style={styles.editItem}>✏️</Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="black"
                accessibilityLabel="Tap me to delete your todo task."
                accessible={true}
                onPress={() => this.eraseTask(task.id)}
              >
                <Text style={styles.editItem}>DEL</Text>
              </TouchableHighlight>
              </View>}
              {this.props.user.role === "caretaker" && <TouchableHighlight
                underlayColor="black"
                accessibilityLabel="Tap me to mark your todo task as complete/incomplete."
                accessible={true}
                onPress={() => this.completeTaskByCaretaker(task.id)}
              >
              <Text style={styles.listItem}>{task.completed ? "TASK COMPLETED" : "MARK COMPLETED"}</Text>
              </TouchableHighlight>}
            </View>
          </View>
        </View>
      );
    }).reverse();
    return (
      <View>
        <View style={styles.listHeader}>
          <Text style={styles.listName}>{name}</Text>
        </View>
        {this.props.user.role === 'client' && <View style={styles.addTaskContainer}>
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
        </View>}
        {tasks.length < 1 && <View><Text>No tasks yet!</Text></View>}
        <View>{allTasks}</View>
      </View>
  )}
}

export const mapStateToProps = state => ({
  tasks: state.tasks,
  user: state.userAccount

});

export const mapDispatchToProps = dispatch => ({
  loadTasks: tasks => dispatch(loadTasks(tasks))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);


Tasks.propTypes = {
  user: PropTypes.object,
  tasks: PropTypes.object
};

//doublecheck protypes

