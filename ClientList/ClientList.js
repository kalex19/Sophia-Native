import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import ClientProfile from "../ClientProfile/ClientProfile";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HeaderNav from "../HeaderNav/HeaderNav";

const ClientList = props => {
  const allLists = props.navigation.state.params.map(list => {
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

