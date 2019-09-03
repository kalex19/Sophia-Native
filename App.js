import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import ClientProfile from "./ClientProfile/ClientProfile";
import ClientList from "./ClientList/ClientList";
import AddListForm from "./AddListForm/AddListForm";
import IndividualList from "./IndividualList/IndividualList";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import {ThemeProvider} from 'react-native-elements';
import { TouchableHighlight } from "react-native-gesture-handler";

class App extends Component {
  state = {
    profile: {
      id: 9999,
      name: "Sophia Apps",
      street_address: "13424 Sophia Dr",
      city: "Denver",
      state: "CO",
      zip: "80300",
      email: "sophia@sophia.com",
      phone: "7209993333",
      username: "Sophie",
      allergies: ["gluten"],
      dietary_restrictions: [],
      medications: ["Med1", "Med2", "Med3"]
    },
    lists: [
      {
        id: 1,
        name: "Groceries",
        items: [
          { id: 1000, list_id: 1, name: "Apples", notes: "Fuji, not Gala" },
          { id: 1001, list_id: 1, name: "Oranges", notes: "" },
          {
            id: 1002,
            list_id: 1,
            name: "Bananas",
            notes: "organic, no black spots"
          }
        ]
      },
      {
        id: 2,
        name: "Laundry",
        items: [
          {
            id: 1003,
            list_id: 2,
            name: "Whites",
            notes: "Use special detergent"
          },
          { id: 1004, list_id: 2, name: "Colors", notes: "Don't use bleach" }
        ]
      }
    ]
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header} accessibilityLabel="Speech Operated Personal Household Interactive Assistant">SOPHIA</Text>
        </View>
        <Text style={styles.greeting}>Welcome Back {this.state.profile.username}!</Text>
        {/* <TouchableHighlight accessibilityLabel='Tap me' accessible={true}> */}
          <View style={styles.routes}>
           <Button
              title=" My Profile" color='white' accessibilityLabel="Navigate to your profile. From there, view your personal information" nextFocusDown='20'
              onPress={() =>
              this.props.navigation.navigate("Profile", this.state.profile)
              }
            />
          </View>
        {/* </TouchableHighlight> */}
        <View style={styles.routes}>
        {/* <TouchableHighlight accessibilityLabel='Tap me' accessible={true}> */}
            <Button
               title="My Todo Lists" color='white' accessibilityLabel="Navigate to your todo lists. From there view or create your tasks."
              onPress={() =>
              this.props.navigation.navigate("Lists", this.state.lists)
              }
            />
        {/* </TouchableHighlight> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: 'red',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 40,
  },
  header: {
    fontSize: 50,
    fontFamily: 'Didot',
  },
  greeting: {
    fontSize: 30,
    fontFamily: 'Didot',
    margin: 10,
    marginBottom: 30,
  },
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
  },
  routes: {
    flexDirection: 'column',
    backgroundColor: 'red',
    width: '80%',
    height: '20%',
    justifyContent: 'space-around',
    margin: 10,
   
  }
});

const AppNavigator = createStackNavigator(
  {
    Home: App,
    Profile: ClientProfile,
    Lists: ClientList,
    IndividualList: IndividualList
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
