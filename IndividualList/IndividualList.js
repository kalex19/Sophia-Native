import React, {Component} from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

class IndividualList extends Component {
  render() {
  let task;
  const list = props.navigation.state.params;
  const noItems = <View style={styles.listItemContainer} key={Math.random()}><Text style={styles.listItem}>No Tasks</Text></View>;
  const allItems = list.items.map(item => {
      <View style={styles.listItemContainer} key={Math.random()}>
      <View style={styles.listItemHeaderContainer}>
          <TouchableHighlight underlayColor='black'
              accessibilityLabel="Tap me to complete or uncomplete your todo task." accessible={true} onPress={() =>
                this.props.navigation.navigate("Lists", this.state.lists)}><Text style={styles.listItem}>{item.completed ? "✔︎" : "x"}</Text></TouchableHighlight>
            <Text style={styles.listItemHeader}>{item.name}</Text>
            <TouchableHighlight  underlayColor='black'
              accessibilityLabel="Tap me to delete your todo task." accessible={true} onPress={() =>
                this.props.navigation.navigate("Lists", this.state.lists)}><Text style={styles.listItem}>🗑</Text></TouchableHighlight>
      </View>
      <View style={styles.listItemInfoContainer}>
        <Text style={styles.listItem}>{item.notes ? `Note: ${item.notes}` : "No Details"}</Text><Text style={styles.listItem}>{item.due_date ? `Due: ${item.due_date}` : ""}</Text>
      </View>
      </View>
      });

      // if(!list.items.length){
      //   task = noItems
      // } else {
      //   task = allItems
      // }
      
  return (
    <View>
      <View style={styles.listHeader}>
        <Text style={styles.listName}>{list.name}</Text>
      </View>
      {/* {!list.items.length ? noItems : allItems} */}
      {/* {task} */}
      <TouchableHighlight underlayColor='black'           accessibilityLabel="Tap me to add a task." accessible={true}
        onPress={() => props.navigation.navigate("AddListForm")}
      style={styles.addTaskContainer}><Text style={styles.addTask}> + ADD NEW TASK </Text></TouchableHighlight>
    </View>
    );
  };
};

export default IndividualList;

const styles = StyleSheet.create({
  listHeader: {
    borderBottomColor: 'maroon',
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 10,
  },
  listName: {
    fontSize: 30,
    fontFamily: 'Didot',
    margin: 10,
    textAlign: 'center'
  },
  listItemHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  listItemContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: 'maroon',
  },
  listItemHeader: {
    textAlign: 'center',
    fontSize: 35,
    color: 'white',
    fontFamily: 'Didot',
  },
  listItemInfoContainer: {
    flexDirection: 'column',
  },
  listItem: {
    fontSize: 25,
    color: 'white',
  },
  addTaskContainer: {
    backgroundColor: "maroon",
    alignItems: "center",
    marginRight: 30,
    marginLeft: 30,
    padding: 20,
    borderRadius: 40,
    width: '80%',
    justifyContent: 'center',
  },
  addTask: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Didot',
  },
})