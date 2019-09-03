import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const ClientList = props => {
  const allLists = props.navigation.state.params.map(list => {
    return (
      <View style={styles.lists} key={list.id}>
        <TouchableHighlight underlayColor='black' accessibilityLabel="Tap me to navigate to your `${list.name}` list. From there view or create your tasks." accessible={true}
          onPress={() => props.navigation.navigate("IndividualList", list)}
        ><Text style={styles.listName}>{`${list.name}`}</Text></TouchableHighlight>
      </View>
    );
  });
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Todo Lists</Text>
      </View>
      {allLists}
      <TouchableHighlight underlayColor='black'           accessibilityLabel="Tap me to navigate to your todo lists. From there view or create your tasks." accessible={true}
        onPress={() => props.navigation.navigate("AddListForm")}
      style={styles.addListContainer}><Text style={styles.listName}> + ADD NEW LIST </Text></TouchableHighlight>
    </View>
  );
};

export default ClientList;

const styles = StyleSheet.create({
  headerContainer: {
    borderColor: 'maroon',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    padding: 10,
  },
  header: {
    fontSize: 40,
    fontFamily: 'Didot',
    textAlign: 'center',
  },
  addListContainer: {
    backgroundColor: "maroon",
    alignItems: "center",
    marginRight: 30,
    marginLeft: 30,
    padding: 20,
    borderRadius: 40,
    width: '80%',
    justifyContent: 'center',
  },
  lists: {
    backgroundColor: "maroon",
    alignItems: "center",
    margin: 10,
    padding: 20,
  },
  listName: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Didot',
  },
});
