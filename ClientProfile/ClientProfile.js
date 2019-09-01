import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ClientProfile extends ( Component ) {
  state = {}

  render() {
    return (
      <View>
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