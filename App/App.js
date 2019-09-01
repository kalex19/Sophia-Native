import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ClientProfile from '../ClientProfile/ClientProfile'

export default function App() {
  return (
    <View style={styles.container}>
      <ClientProfile />
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
