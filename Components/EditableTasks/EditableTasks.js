export const EditableTasks = () => {
	const { name } = this.props.navigation.state.params;
	const { tasks } = this.props;
	const allTasks = tasks.map(task => {
		return (
			<View style={styles.lists} key={task.id}>
				<View style={styles.listItemHeaderContainer}>
					<Text style={styles.listItemHeader}>{task.name}</Text>
					<View style={styles.priorityLevels}>
						{this.props.user.role === 'client' && (
							<TouchableHighlight
								underlayColor="black"
								accessibilityLabel="Tap me to lower the priority level of the task."
								accessible={true}
								onPress={() => this.lowerPriority(task.id, task.priority)}
							>
								<Text>🔽</Text>
							</TouchableHighlight>
						)}
						<Text style={styles.priorityFont}>Priority: {task.priority}</Text>
						{this.props.user.role === 'client' && (
							<TouchableHighlight
								underlayColor="black"
								accessibilityLabel="Tap me to increase the priority level of the task."
								accessible={true}
								onPress={() => this.increasePriority(task.id, task.priority)}
							>
								<Text>🔼</Text>
							</TouchableHighlight>
						)}
					</View>
					{this.props.user.role === 'client' && (
						<Text style={styles.listComplete}>{task.completed ? 'TASK WAS COMPLETED' : 'NOT COMPLETED YET'}</Text>
					)}
					{this.props.user.role === 'client' && (
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
							{task.description.length > 0 && <Text style={styles.listItemSecond}>Notes: {task.description}</Text>}
							{task.due_date != null && <Text style={styles.listItemSecond}>Due: {task.due_date}</Text>}
						</View>
					)}
					{this.state.displayEdit === task.id && (
						<View style={styles.alignEdit}>
							<TextInput
								style={styles.inputEdit}
								label="Edit task"
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
						{this.props.user.role === 'caretaker' && (
							<TouchableHighlight
								underlayColor="black"
								accessibilityLabel="Tap me to mark your todo task as complete/incomplete."
								accessible={true}
								onPress={() => this.completeTaskByCaretaker(task.id, task.completed)}
							>
								<Text style={styles.listComplete}>{task.completed ? 'TASK HAS BEEN COMPLETED' : 'MARK COMPLETED'}</Text>
							</TouchableHighlight>
						)}
					</View>
				</View>
			</View>
		);
	});
	return (
		<View>
			<View style={styles.listHeader}>
				<Text style={styles.listName}>{name}</Text>
			</View>
			<ScrollView>
				{this.props.user.role === 'client' && (
					<View style={styles.addTaskContainer}>
						<View style={styles.align}>
							<Text style={styles.label}>Task Name:</Text>
							<TextInput
								style={styles.input}
								value={this.state.task_input}
								onChangeText={this.handleChangeTask}
								label="Add Task Name"
								accessibilityLabel="Add your task name"
							></TextInput>
							{this.state.displayExtraInputs === true && (
								<View>
									<Text style={styles.label}>Add Note:</Text>
									<TextInput
										style={styles.input}
										value={this.state.description_input}
										onChangeText={this.handleChangeNote}
										label="Add Note"
										accessibilityLabel="Add a note providing more details about your task"
									></TextInput>
									<Text style={styles.label}>Due Date:</Text>
									<TextInput
										style={styles.input}
										label="mm/dd"
										value={this.state.due_date}
										onChangeText={this.handleChangeDate}
										accessibilityLabel="Add to due date to communicate when the task needs to be completed by"
									></TextInput>
								</View>
							)}
							<TouchableHighlight
								accessibilityLabel="Press to add more details about your task"
								onPress={this.expandInputField}
							>
								<Text style={styles.label}>
									{this.state.displayExtraInputs === false ? 'Add more details' : 'Hide details'}
								</Text>
							</TouchableHighlight>
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
};

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
)(EditableTasks);

EditableTasks.propTypes = {
	user: PropTypes.object,
	tasks: PropTypes.array
};

// put task editing logic here not in comp
