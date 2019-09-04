import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { connect } from 'react-redux';
import { loadProfile, loadLists } from '../actions';

const Homescreen = (props) => {
  

  useEffect(() => {
    const allInfo = {
      profile: {
        id: 9999,
        name: "Sophia Apps",
        street_address: "13424 Sophia Dr",
        city: "Denver",
        state: "CO",
        zip: "80300",
        email: "sophia@sophia.com",
        phone: "720-999-3333",
        username: "Sophie",
        allergies: ["gluten"],
        dietary_restrictions: [],
        medications: ["Med1", "Med2", "Med3"]
      }
    };
    const allLists = [
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
      props.loadProfile(allInfo)
      props.loadLists(allLists)
    })
    
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text
            style={styles.header}
            accessibilityLabel="Speech Operated Personal Household Interactive Assistant"
          >
            SOPHIA
          </Text>
        </View>
        <Text style={styles.greeting}>
          {/* Welcome Back {props.profile.profile.username}! */}
        </Text>
        <View style={styles.routes}>
          <TouchableHighlight
            underlayColor="black"
            accessibilityLabel="Tap to navigate to your profile. From there, view your personal information"
            nextFocusDown="20"
            accessible={true}
            onPress={() => props.navigation.navigate("Profile", props.profile.profile)
            }
          >
            <Text style={styles.button}>My Account</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.routes}>
          <TouchableHighlight
            underlayColor="black"
            accessibilityLabel="Tap me to navigate to your todo lists. From there view or create your tasks."
            accessible={true}
            onPress={() => props.navigation.navigate("Lists", props.lists)
            }
          >
            <Text style={styles.button}>My Todo Lists</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: "maroon",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 40
  },
  header: {
    fontSize: 50,
    fontFamily: "Didot"
  },
  greeting: {
    fontSize: 30,
    fontFamily: "Didot",
    margin: 10,
    marginBottom: 30
  },
  button: {
    color: "white",
    fontSize: 25,
    fontFamily: "Didot",
    textAlign: "center"
  },
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  routes: {
    flexDirection: "column",
    backgroundColor: "maroon",
    width: "80%",
    height: "20%",
    justifyContent: "space-around",
    margin: 10
  }
});

export const mapStateToProps = state => ({
  profile: state.profile,
  lists: state.lists
})

export const mapDispatchToProps = dispatch => ({
  loadProfile: profile => dispatch(loadProfile(profile)),
  loadLists: lists => dispatch(loadLists(lists))
})

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen)
