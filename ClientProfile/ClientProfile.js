import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { PinchZoomView } from 'react-native-pinch-zoom-view';

class ClientProfile extends ( Component ) {
  state = {}

  render() {
    let client = this.props.navigation.state.params
    let allMedications = client.medications.map(med => {
      return <Text style={styles.clientInfoList} key={Math.random()}>- {med}</Text>
    })
    let allAllergies = client.allergies.map(allergy => {
      return <Text style={styles.clientInfoList} key={Math.random()}>- {allergy}</Text>
    })
    let allRestrictions = client.dietary_restrictions.map(restr => {
      return <Text style={styles.clientInfoList} key={Math.random()}>- {restr}</Text>
    })
    return (
      <ScrollView style={styles.profileContainer}>
        <View style={styles.headerCntainer}>
          <Text style={styles.header}>Client Profile</Text>
        </View>
        <Text style={styles.clientInfo}>Username: {client.username}</Text>
        <Text style={styles.clientInfo}>Name: {client.name}</Text>
        <Text style={styles.clientInfo}>Street Adress: {client.street_address}</Text>
        <Text style={styles.clientInfo}>City: {client.city}</Text>
        <Text style={styles.clientInfo}>State: {client.state}</Text>
        <Text style={styles.clientInfo}>Zip Code: {client.zip}</Text>
        <Text style={styles.clientInfo}>Email: {client.email}</Text>
        <Text style={styles.clientInfo}>Phone Number: {client.phone}</Text>
        {/* <Text>Needs: </Text> */}
        <View style={styles.infoCntainer}>
          <Text style={styles.clientInfoList}>Allergies: </Text>
            {allAllergies}
        </View>
        <View style={styles.infoCntainer}>
          <Text style={styles.clientInfoList}>Dietary Restrictions: </Text>
            {allRestrictions}
        </View>
        <View style={styles.infoCntainer}>
          <Text style={styles.clientInfoList}>Medications:</Text>
           {allMedications}
        </View>
      </ScrollView>
    )
  }
}

export default ClientProfile;

const styles = StyleSheet.create({
  profileContainer: {
    margin: 30,
  },
  headerCntainer: {
    borderBottomColor: 'maroon',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Didot',
  },
  clientInfo: {
    fontSize: 20,
    fontFamily: 'Didot',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'maroon',
    color: 'white',
    padding: 20,
  },
  infoCntainer: {
    backgroundColor: 'maroon',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  clientInfoList: {
    fontSize: 20,
    fontFamily: 'Didot',
    color: 'white',
  }
})