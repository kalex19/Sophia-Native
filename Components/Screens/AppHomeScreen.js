import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import theme from '../../theme';
import {styles} from './styleAppHomeScreen';


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

export default AppHomeScreen
