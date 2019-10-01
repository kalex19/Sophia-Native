import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Button from '../Button/Button';

export const List = ({ list, navigation, user }) => {
	return (
		<View style={styles.container} key={list.id}>
			{list.role === 'client' && <Text style={styles.name}>{list.caretaker_name}'s list</Text>}
			{list.role === 'caretaker' && <Text style={styles.name}>{list.client_name}'s list</Text>}
			<Button
				accessibilityLabel={`Tap me to navigate to your ${list.name} list. From there view your tasks.`}
				onPress={() => {
					navigation.navigate('NeedToDoTasks', list);
				}}
			>
				{list.name}
			</Button>
		</View>
	);
};
