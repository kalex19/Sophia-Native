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

