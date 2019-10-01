import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import Button from '../Button/Button';

export const Task = ({ task }) => {
	return (
		<View style={styles.container}>
			{task.name.length > 0 && <Text style={styles.taskText}>{task.name}</Text>}
			<Text>Priority: {task.priority}</Text>
			{task.description.length > 0 && (
				<Text numberOfLines={3} style={styles.taskText}>
					Notes: {task.description.length < 21 ? `${task.description}` : `${task.description.substring(0, 17)}...`}
				</Text>
			)}
			{task.due_date != null && <Text style={styles.taskText}>Due: {task.due_date}</Text>}
			<Button
				onPress={() => this.completeTaskByCaretaker(task.id, task.completed)}
				accessibilityLabel="Tap me to mark your todo task as complete/incomplete."
			>
				{task.completed ? 'TASK COMPLETE' : 'MARK COMPLETE'}
			</Button>
		</View>
	);
};
