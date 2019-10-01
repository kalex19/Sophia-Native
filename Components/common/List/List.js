import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import styles from './styles';

export const List = ({ list, navigation, user }) => {
	return (
		<View style={styles.lists} key={list.id} accessible={true}>
			<TouchableHighlight
				underlayColor="black"
				accessibilityLabel={`Tap me to navigate to your ${list.name} list. From there view your tasks.`}
				accessible={true}
				style={styles.listName}
				onPress={() => {
					navigation.navigate('NeedToDoTasks', list);
				}}
			>
				<Text style={styles.name}>{list.name}</Text>
			</TouchableHighlight>
			{list.role === 'client' && <Text style={styles.name}>{list.caretaker_name}'s list</Text>}
			{list.role === 'caretaker' && <Text style={styles.name}>{list.client_name}'s list</Text>}
		</View>
	);
};
