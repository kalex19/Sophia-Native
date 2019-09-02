import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ClientList = props => {
  const allLists = props.navigation.state.params.map(list => {
    return (
      <View style={styles.lists} key={list.id}>
        {/* <Text>{list.name}</Text> */}
        <Button
          title={`${list.name}`}
          onPress={() =>
            props.navigation.navigate("IndividualList", list)
          }
        />
      </View>
    );
  });
  return allLists;
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

