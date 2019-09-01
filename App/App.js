import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ClientProfile from '../ClientProfile/ClientProfile';
import ClientList from '../ClientList/ClientList';
import AddListForm from '../AddListForm/AddListForm';

export default function App() {
  return (
    <View style={styles.container}>
      <ClientProfile />
      <ClientList />
      <AddListForm />
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
