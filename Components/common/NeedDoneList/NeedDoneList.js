import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Button from '../Button/Button';

export const NeedDoneList = ({ list, navigation}) => {
	return (
		<View style={styles.container} key={list.id}>
			{list.role === 'client' && <Text style={styles.name}>Assigned To: {list.caretaker_name}</Text>}
			{list.role === 'caretaker' && <Text style={styles.name}>Assigned To: {list.client_name}</Text>}
			<Button
				accessibilityLabel={`Tap me to navigate to your ${list.name} list. From there view your tasks.`}
				onPress={() => {
					navigation.navigate('NeedDoneTasks', list);
				}}
			>
				{list.name}
			</Button>
		</View>
	);
};


