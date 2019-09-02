import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HeaderNav = props => {
  return(
    <View>
      <Button title="Profile" onPress={() => props.navigation.navigate('Profile')} />
      <Button title="Lists" onPress={() => props.navigation.navigate('Lists')} />
    </View>
  )
}

export default HeaderNav;

