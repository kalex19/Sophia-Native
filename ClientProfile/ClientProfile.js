import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HeaderNav from "../HeaderNav/HeaderNav";

class ClientProfile extends ( Component ) {
  state = {}

  render() {
    return (
      <View style={styles.client}>
        <Text>Client Profile</Text>
        <Text>Username: </Text>
        <Text>Name: </Text>
        <Text>Street Adress: </Text>
        <Text>City: </Text>
        <Text>State: </Text>
        <Text>Zip Code: </Text>
        <Text>Email: </Text>
        <Text>Phone Number: </Text>
        <Text>Needs: </Text>
        <Text>Allergies: </Text>
        <Text>Dietary restrictions: </Text>
        <Text>Medications: </Text>
      </View>
    )
  }
}

export default ClientProfile;

const styles = StyleSheet.create({
  client: {
    backgroundColor: 'yellow'
  }
})