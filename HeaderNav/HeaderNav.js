import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
// import { createStackNavigator } from 'react-navigation-stack';
import ClientProfile from "../ClientProfile/ClientProfile";
import ClientList from "../ClientList/ClientList";
import { createStackNavigator, createAppContainer } from 'react-navigation-stack';

const HeaderNav = props => {
  return(
    <View>
      <Button title="Profile" onPress={() => props.navigation.navigate('Profile')} />
      <Button title="Lists" onPress={() => props.navigation.navigate('Lists')} />
    </View>
  )
}

export default HeaderNav;

