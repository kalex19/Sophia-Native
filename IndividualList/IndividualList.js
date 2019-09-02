import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class IndividualList extends Component {
  state = {
    list_name: '',
    list_items: []
  }

  render() {
    return (
      <View>
        <Text>IndividualList</Text>
      </View>
    )
  }
}

export default IndividualList;