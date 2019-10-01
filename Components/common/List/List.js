import React from "react";
import { View, TouchableHighlight, Text } from "react-native";
import styles from "./styles";

export const List = ({list}) => {
	// console.log("THIS IS THE LIST", list);
	console.log("NAME OF LIST", list.name)
  return (
    <View style={styles.lists} key={list.id} accessible={true}>
      <TouchableHighlight
        underlayColor="black"
        accessibilityLabel={`Tap me to navigate to your ${list.name} list. From there view your tasks.`}
        accessible={true}
        style={styles.listName}
        onPress={() => {
          this.props.navigation.navigate("NeedToDoTasks", list);
        }}
      >
        <Text style={styles.name}>{list.name}</Text>
        {/* look into this badge */}
      </TouchableHighlight>
        <Text style={styles.name}>Caretaker: {list.caretaker_name}</Text>
    </View>
  );
};
