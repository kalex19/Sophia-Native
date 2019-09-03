import React from "react";
import { View, Text, StyleSheet } from "react-native";

const IndividualList = props => {
  const list = props.navigation.state.params;
  const allItems = list.items.map(item => {
    if(!item.notes.length){
      return <Text key={Math.random()}>{item.name}</Text>
    }
    return (
      <View key={Math.random()}>
      <Text>{item.name} - note*: {item.notes}   -Due date: {item.due_date} - Completed: {item.completed ? "Yes" : "No"}</Text>
      </View>
    );
  });
  return (
    <View>
      <Text>{list.name}</Text>
      {allItems}
    </View>
  );
};

export default IndividualList;
