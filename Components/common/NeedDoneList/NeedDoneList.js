import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Button from '../Button/Button';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Input from "../Input/Input"


export const NeedDoneList = ({ list, navigation, targetId, toggleEditName, eraseList, displayEdit, list_edit_input, handleEditList, handleSubmitEdit }) => {
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




{(displayEdit === true && targetId === list.id) && (
								<View style={styles.align}>
									<Input
										label="New name"
										value={list_edit_input}
										onChangeText={handleEditList}
										saveRecordedText={text => handleEditList(text)}
									/>
									<Button
										accessibilityLabel="Tap me to submit your edited list name."
										onPress={() => handleSubmitEdit(list.id)}
									>
										✔︎
									</Button>
								</View>
							)}








			<View style={styles.vertically}>
				<TouchableHighlight
					underlayColor="black"
					accessibilityLabel="Tap me to open form and edit your list name."
					onPress={() => toggleEditName(list.id)}
				>
					<Text style={styles.editItem}>✏️ EDIT</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={() => eraseList(list.id)}>
					<Text style={styles.editItem}>🗑 DELETE</Text>
				</TouchableHighlight>
			</View>
		</View>
	);
};
