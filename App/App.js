import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ClientProfile from '../ClientProfile/ClientProfile';
import ClientList from '../ClientList/ClientList';

export default function App() {
  return (
    <View style={styles.container}>
      <ClientProfile />
      <ClientList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
