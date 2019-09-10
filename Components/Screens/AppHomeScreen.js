import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import theme from '../../theme';


const AppHomeScreen = (props) => {
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
            accessibilityLabel="Tap me to log in to your account"
            accessible={true}
            onPress={() => props.navigation.navigate("Login")
            }
            style={styles.touchExpander}
          >
            <Text style={styles.button}>Log In</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.routes}>
          <TouchableHighlight
            underlayColor="black"
            accessibilityLabel="Tap me to create a new account"
            accessible={true}
            onPress={() => props.navigation.navigate("CreateAccount")
            }
            style={styles.touchExpander}
          >
            <Text style={styles.button}>Create Account</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: theme.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 30
  },
  header: {
    fontSize: 50,
    fontFamily: theme.textMain
  },
  greeting: {
    fontSize: 30,
    fontFamily: theme.textMain,
    margin: 10,
    marginBottom: 30
  },
  button: {
    color: theme.accentOne,
    fontSize: 30,
    fontFamily: theme.textTwo,
    textAlign: "center",
    paddingTop: 25,
  },
  container: {
    backgroundColor: theme.accentOne,
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  routes: {
    flexDirection: "column",
    backgroundColor: theme.primary,
    width: "80%",
    height: "15%",
    justifyContent: "space-around",
    margin: 10,
    borderRadius: 50,
  },
  touchExpander: {
		height: '100%',
		borderRadius: 50,
		width: '100%'
	}
});

export default AppHomeScreen
