import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ClientProfile extends ( Component ) {
  state = {}

  render() {
    let client = this.props.navigation.state.params
    let allMedications = client.medications.map(med => {
      return <Text key={Math.random()}>- {med}</Text>
    })
    let allAllergies = client.allergies.map(allergy => {
      return <Text key={Math.random()}>- {allergy}</Text>
    })
    let allRestrictions = client.dietary_restrictions.map(restr => {
      return <Text key={Math.random()}>- {restr}</Text>
    })
    return (
      <View style={styles.client}>
        <Text>Client Profile</Text>
        <Text>Username: {client.username}</Text>
        <Text>Name: {client.name}</Text>
        <Text>Street Adress: {client.street_address}</Text>
        <Text>City: {client.city}</Text>
        <Text>State: {client.state}</Text>
        <Text>Zip Code: {client.zip}</Text>
        <Text>Email: {client.email}</Text>
        <Text>Phone Number: {client.phone}</Text>
        {/* <Text>Needs: </Text> */}
        <Text>Allergies: </Text>
          {allAllergies}
        <Text>Dietary restrictions: </Text>
          {allRestrictions}
        <Text>Medications: </Text>
          {allMedications}
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