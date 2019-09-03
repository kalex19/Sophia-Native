import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ClientList = props => {
  const allLists = props.navigation.state.params.map(list => {
    return (
      <View style={styles.lists} key={list.id}>
        <Button
          title={`${list.name}`}
          onPress={() => props.navigation.navigate("IndividualList", list)}
        />
      </View>
    );
  });
  return (
    <View>
      {allLists}
      <Button
        title="+ Add New List"
        onPress={() => props.navigation.navigate("AddListForm")}
      />
    </View>
  );
};

export default ClientList;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
    backgroundColor: "green"
  },
  lists: {
    backgroundColor: "red",
    alignItems: "center"
  }
});
