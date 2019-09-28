import React from 'react';
import { View } from 'react-native';
import styles from './styles';

export const Lists = () => {
	return (
		<View style={styles.lists} key={list.id} accessible={true}>
			<TouchableHighlight
				underlayColor="black"
				accessibilityLabel={`Tap me to navigate to your ${this.props.list.name} list. From there view your tasks.`}
				accessible={true}
			>
				<Text
					style={styles.listName}
					onPress={() => {
						this.props.navigation.navigate('NeedToDoTasks', list);
					}}
				>
					{list.name}
				</Text>
				<Text style={styles.name}>Caretaker: {list.caretaker_name}</Text>
        {/* look into this badge */}
			</TouchableHighlight>
		</View>
	);
};

export const EditableLists = () => {
<View style={styles.lists} key={list.id} accessible={true}>
	<TouchableHighlight
		underlayColor="black"
		accessibilityLabel={`Tap me to navigate to your ${list.name} list. From there view or create your tasks.`}
		accessible={true}
	>
			<View>
				<Text
					style={styles.listName}
					onPress={() => {
						this.props.navigation.navigate('NeedDoneTasks', list);
					}}
				>
					{list.name}
				</Text>
				<Text style={styles.name}>Caretaker: {list.caretaker_name}</Text>
         {/* look into this badge */}
			</View>
	</TouchableHighlight>
		<View style={styles.align}>
			<TextInput
				style={styles.input}
				placeholder="New name"
				value={this.state.list_edit_input}
				onChangeText={this.handleEditList}
			/>
			<TouchableHighlight
				underlayColor="black"
				accessibilityLabel="Tap me to submit your edited list name."
				onPress={() => this.handleSubmitEdit(list.id)}
			>
				<Text style={styles.listItem}>✔︎</Text>
			</TouchableHighlight>
		</View>
	<View style={styles.vertically}>
		<TouchableHighlight
			underlayColor="black"
			accessibilityLabel="Tap me to open form and edit your list name."
			onPress={() => this.toggleEditName(list.id)}
		>
			<Text style={styles.editItem}>✏️</Text>
		</TouchableHighlight>
		<TouchableHighlight underlayColor="black" onPress={() => this.eraseList(list.id)} accessibilityLabel="Tap me to delete your list.">
			<Text style={styles.editItem}>🗑</Text>
		</TouchableHighlight>
	</View>
</View>;
};

// where does the logic for editing a list go? Here or in NeedDone comp?



