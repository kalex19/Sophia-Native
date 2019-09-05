import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const UserHomeScreen = (props) => {
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
        <View style={styles.routes}>
          <TouchableHighlight
            underlayColor="black"
            accessibilityLabel="Tap to log in to your account"
            accessible={true}
            onPress={() => props.navigation.navigate("Login")
            }
          >
            <Text style={styles.button}>Log In</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.routes}>
          <TouchableHighlight
            underlayColor="black"
            accessibilityLabel="Tap me to create your account."
            accessible={true}
            onPress={() => props.navigation.navigate("CreateAccount")
            }
          >
            <Text style={styles.button}>Create Account</Text>
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

export default UserHomeScreen
