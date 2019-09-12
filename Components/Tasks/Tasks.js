import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import { loadTasks } from "../../actions";
import { fetchTasks, postTask, patchTask, deleteTask } from "../../Utils/clientApiCalls";
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
      task_edit_input: ""
    };
  }

  componentDidMount = async () => {
    await this.returnUpdatedTask();
  };

  returnUpdatedTask = async () => {
    const {user, list } = this.props
    const tasks = await fetchTasks(list.id, user.id);
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
    const {user, list } = this.props
    const { task_edit_input } = this.state;
    const modifiedTask = { name: task_edit_input };
    await patchTask(modifiedTask, list.id, taskId, user.id);
    await this.returnUpdatedTask();
    this.setState({ task_edit_input: "", displayEdit: false });
  };

  handleSubmit = async newTask => {
    const {user, list } = this.props
    const { task_input, description_input, due_date } = this.state;
    newTask = {
      name: task_input,
      description: description_input,
      due_date: due_date
    };
    await postTask(newTask, list.id, user.id);
    await this.returnUpdatedTask();
    this.setState({ task_input: "", description_input: "", due_date: "" });
  };

  eraseTask = async taskId => {
    const {user, list } = this.props
    await deleteTask(list.id, taskId, client.id);
    this.returnUpdatedTask();
  };

  render() {
    const { name } = this.props.navigation.state.params;
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
                <Text style={styles.listItem}>{task.completed ? "✔︎" : "x"}</Text>
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
          <Text style={styles.listName}>{name}</Text>
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
        {allTasks}
      </View>
  )}

  caretakerTasks = () => {
    const { tasks, list } = this.props;
    const allCaretakerTasks = tasks.map(task => {
        <View style={styles.lists}>
          <View style={styles.listItemHeaderContainer}>
            {this.state.displayEdit !== task.id && (
              <View style={styles.taskNoteDue}>
              <Text style={styles.listItemHeader}>{task.name}</Text>
              {task.description.length > 0 && <Text style={styles.listItemSecond}>notes: {task.description}</Text>}
              {task.due_date !== null && <Text style={styles.listItemSecond}>due: {task.due_date}</Text>}
              </View>
            )} 
            {/* Need to add  un/complete functionality */}
          </View>
        </View>
    }).reverse();
    return(
      <View>{allCaretakerTasks}</View>
    )};

  render() {
    return(
    <View>
      <Text>{list.name}</Text>
      <Text>My Tasks</Text>
        <Text>{!this.props.task && "No Tasks"}</Text>
        <View>
        {this.props.user.accountType === 'client' && this.clientTasks}
        {this.props.user.accountType === 'caretaker' && this.caretakerTasks}  </View> 
      </View>
    );
  }

  // caretakerTasks = () => {
  //   const { tasks, list } = this.props;
  //   const allCaretakerTasks = tasks.map(task => {
  //       <View style={styles.lists}>
  //         <View style={styles.listItemHeaderContainer}>
  //           {this.state.displayEdit !== task.id && (
  //             <View style={styles.taskNoteDue}>
  //             <Text style={styles.listItemHeader}>{task.name}</Text>
  //             {task.description.length > 0 && <Text style={styles.listItemSecond}>notes: {task.description}</Text>}
  //             {task.due_date !== null && <Text style={styles.listItemSecond}>due: {task.due_date}</Text>}
  //             </View>
  //           )} 
  //           {/* Need to add ability to complete functionality */}
  //         </View>
  //       </View>
  //   }).reverse();
  //   return(
  //     <View>{allCaretakerTasks}</View>
  //   )};

  // render() {
  //   return(
  //   <View>
  //     <Text>{list.name}</Text>
  //     <Text>My Tasks</Text>
  //       <Text>{!this.props.task? "No Tasks" : null}</Text>
  //       <View>{this.props.user.accountType === 'client' ? this.clientTasks : this.caretakerTasks}</View> 
  //       {/* insted of ternary use line 191 logic */}
  //     </View>
  //   );
  // }
}

export const mapStateToProps = state => ({
  tasks: state.tasks,
  user: state.userAccount,
  // list: state.list

});

export const mapDispatchToProps = dispatch => ({
  loadTasks: tasks => dispatch(loadTasks(tasks))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);


Tasks.propTypes = {
  userAccount: PropTypes.object,
  tasks: PropTypes.object,
  list: PropTypes.object
};

//doublecheck protypes

