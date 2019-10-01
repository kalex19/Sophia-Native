import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import Button from '../Button/Button';
import { patchCompletedTask } from '../../../Utils/patchCompletedTask';
import { fetchAllTasks } from '../../../Utils/fetchAllTasks';

export const Task = ({ task, navigation, loadTasks }) => {
	completeTask = async (taskId, taskCompleted) => {
		const list = navigation.state.params;
		taskCompleted = !taskCompleted;
		const completedTask = { completed: taskCompleted };
		await patchCompletedTask(completedTask, list.id, taskId);
		await this.returnUpdatedTask();
	};

	returnUpdatedTask = async () => {
		const list = navigation.state.params;
		const tasks = await fetchAllTasks(list.id);
		loadTasks(tasks);
	};

	return (
		<View style={styles.container}>
			{task.name.length > 0 && (
				<Text style={styles.taskHeader} numberOfLines={3}>
					{task.name}
				</Text>
			)}
			<Text style={styles.taskText}>Priority: {task.priority}</Text>
			{task.description.length > 0 && (
				<Text numberOfLines={3} style={styles.taskText}>
					{task.description}
				</Text>
			)}
			{task.due_date != null && <Text style={styles.taskText}>DUE: {task.due_date}</Text>}
			<Button
				onPress={() => this.completeTask(task.id, task.completed)}
				accessibilityLabel="Tap me to mark your todo task as complete/incomplete."
			>
				{task.completed ? '✔︎' : 'Ⅹ'}
			</Button>
		</View>
	);
};
