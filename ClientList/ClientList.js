import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ClientList = props => {
  return (
    <View>
      <Text style={styles.title}>Sophia's Lists</Text>
      <View style={styles.lists}>
        <Text>Route to List 1</Text>
        <Text>Route to List 2</Text>
        <Text>Route to List 3</Text>
      </View>
    </View>
  );
};

export default ClientList;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',  
    fontSize: 30,
    backgroundColor: 'green'
  },
  lists: {
    backgroundColor: "red",
    alignItems: 'center'
  }
});
