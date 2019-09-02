import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

const ClientList = props => {
  const allLists = props.lists.map(list => {
    return (
      <View style={styles.lists} key={list.id}>
        <Text>{list.name}</Text>
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
