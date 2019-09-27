import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import { loadTasks } from "../../actions";
import {
  fetchClientTasks,
  postClientTask,
  patchClientTask,
  deleteClientTask
} from "../../Utils/clientApiCalls";
import {
  fetchCaretakerTasks,
  patchCaretakerTask
} from "../../Utils/caretakerApiCalls";
import { TouchableHighlight, ScrollView } from "react-native-gesture-handler";
import { PropTypes } from "prop-types";
import { styles } from "./styleTasks";

export class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      task_input: "",
      description_input: "",
      due_date: "",
      displayEdit: "",
      task_edit_input: "",
      // completed: false,
      priority: ""
    };
  }

  componentDidMount = async () => {
    this.props.user.role === "caretaker"
      ? await this.returnUpdatedCaretakerTask()
      : this.returnUpdatedTask();
  };

  returnUpdatedCaretakerTask = async () => {
    const list = this.props.navigation.state.params;
    const tasks = await fetchCaretakerTasks(list.id);
    this.props.loadTasks(tasks);
  };

  returnUpdatedTask = async () => {
    const list = this.props.navigation.state.params;
    const { user } = this.props;
    const tasks = await fetchClientTasks(list.id, user.id);
    this.props.loadTasks(tasks);
  };

  toggleEditName = task_id => {
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
    const list = this.props.navigation.state.params;
    const { user } = this.props;
    const { task_edit_input } = this.state;
    const modifiedTask = { name: task_edit_input };
    await patchClientTask(modifiedTask, list.id, taskId, user.id);
    await this.returnUpdatedTask();
    this.setState({ task_edit_input: "", displayEdit: false });
  };

  handleSubmit = async newTask => {
    const list = this.props.navigation.state.params;
    const { user } = this.props;
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
    const list = this.props.navigation.state.params;
    await deleteClientTask(list.id, taskId);
    this.returnUpdatedTask();
  };

  completeTaskByCaretaker = async (taskId, taskCompleted) => {
    const list = this.props.navigation.state.params;
    taskCompleted = !taskCompleted;
    const completedTask = { completed: taskCompleted };
    await patchCaretakerTask(completedTask, list.id, taskId);
    await this.returnUpdatedCaretakerTask();
  };

  lowerPriority = async (taskId, taskPriority) => {
    if(taskPriority === "medium"){
      taskPriority = "low"
    } else if(taskPriority === "high"){
      taskPriority = "medium"
    } else {
      taskPriority = "low"
    }
    const list = this.props.navigation.state.params;
    const changedPriority = { priority: taskPriority};
    await patchClientTask(changedPriority, list.id, taskId);
    await this.returnUpdatedTask();
  }

  increasePriority = async (taskId, taskPriority) => {
    if(taskPriority === "medium"){
      taskPriority = "high"
    } else if(taskPriority === "low"){
      taskPriority = "medium"
    } else {
      taskPriority = "high"
    }
    const list = this.props.navigation.state.params;
    const changedPriority = { priority: taskPriority};
    await patchClientTask(changedPriority, list.id, taskId);
    await this.returnUpdatedTask();
  }

  render() {
    const { name } = this.props.navigation.state.params;
    const { tasks } = this.props;
    const allTasks = tasks
      .map(task => {
        return (
          <View style={styles.lists} key={task.id}> 
            <View style={styles.listItemHeaderContainer}>
              <Text style={styles.listItemHeader}>{task.name}</Text>
              <View style={styles.priorityLevels}>
              {this.props.user.role === "client" && <TouchableHighlight
                    underlayColor="black"
                    accessibilityLabel="Tap me to lower the priority level of the task."
                    accessible={true}
                    onPress={() => this.lowerPriority(task.id, task.priority)}
                  >
                    <Text>🔽</Text>
                  </TouchableHighlight>}
                  <Text style={styles.priorityFont}>Priority: {task.priority}</Text>
                  {this.props.user.role === "client" && <TouchableHighlight
                    underlayColor="black"
                    accessibilityLabel="Tap me to increase the priority level of the task."
                    accessible={true}
                    onPress={() => this.increasePriority(task.id, task.priority)}
                  >
                    <Text>🔼</Text>
                  </TouchableHighlight>}
              </View>
                  {this.props.user.role === "client" && (
                    <Text style={styles.listComplete}>
                      {task.completed
                        ? "TASK WAS COMPLETED"
                        : "NOT COMPLETED YET"}
                    </Text>
                  )}
              {this.props.user.role === "client" && (
                <View>
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
                </View>
              )}
              {this.state.displayEdit !== task.id && (
                <View style={styles.taskNoteDue}>
                  {task.description.length > 0 && (
                    <Text style={styles.listItemSecond}>
                      Notes: {task.description}
                    </Text>
                  )}
                  {task.due_date != null && (
                    <Text style={styles.listItemSecond}>
                      Due: {task.due_date}
                    </Text>
                  )}
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
                    <Text style={styles.editCheck}>✔︎</Text>
                  </TouchableHighlight>
                </View>
              )}
              <View style={styles.vertically}>
                {/* {this.props.user.role === "client" && <View>
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
                <Text style={styles.listComplete}>{task.completed ? "TASK WAS COMPLETED" : "NOT COMPLETED YET"}</Text>
              </View>} */}
                {this.props.user.role === "caretaker" && (
                  <TouchableHighlight
                    underlayColor="black"
                    accessibilityLabel="Tap me to mark your todo task as complete/incomplete."
                    accessible={true}
                    onPress={() => this.completeTaskByCaretaker(task.id, task.completed)}
                  >
                    <Text style={styles.listComplete}>
                      {task.completed ? "TASK HAS BEEN COMPLETED" : "MARK COMPLETED"}
                    </Text>
                  </TouchableHighlight>
                )}
              </View>
            </View>
          </View>
        );
      })
    return (
      <View>
        <View style={styles.listHeader}>
          <Text style={styles.listName}>{name}</Text>
        </View>
        <ScrollView>
          {this.props.user.role === "client" && (
            <View style={styles.addTaskContainer}>
              <View style={styles.align}>
                <Text style={styles.label}>Task Name:</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.task_input}
                  onChangeText={this.handleChangeTask}
                  placeholder="Add Task Name"
                  accessibilityLabel="Add your task name"
                ></TextInput>
                <Text style={styles.label}>Add Note:</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.description_input}
                  onChangeText={this.handleChangeNote}
                  placeholder="Add Note"
                  accessibilityLabel="Add a note providing mroe details about your task"
                ></TextInput>
                <Text style={styles.label}>Due Date:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="mm/dd"
                  value={this.state.due_date}
                  onChangeText={this.handleChangeDate}
                  accessibilityLabel="Add to due date to communicate when the task needs to be completed by"
                ></TextInput>
              </View>
              <View style={styles.submitBtnContainer}>
                <TouchableHighlight
                  underlayColor="black"
                  accessibilityLabel="Tap me to submit your task."
                  accessible={true}
                  onPress={() => this.handleSubmit()}
                >
                  <Text style={styles.submitBtn}>Submit New Task </Text>
                </TouchableHighlight>
              </View>
            </View>
          )}
          {tasks.length < 1 && (
            <View>
              <Text>No tasks yet!</Text>
            </View>
          )}

          <View>{allTasks}</View>
          <View style={{ height: 200 }}></View>
        </ScrollView>
      </View>
    );
  }
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
  tasks: PropTypes.array
};
