import React, { Component } from 'react'
import {  StyleSheet,Text, View, TextInput, TouchableHighlight } from 'react-native';
import theme from '../../theme';
import {styles} from './styleCaretakerList';

export default class List extends Component {
  //make functional comp
  render() {
    return (
    <View style={styles.lists} key={list.id} accessible={true}>
        <TouchableHighlight
          underlayColor="black"
          accessibilityLabel={`Tap me to navigate to your ${list.name} list. From there view your tasks.`}
          accessible={true}
        ></TouchableHighlight>
        {this.state.displayEdit !== list.id && (
          <Text
            style={styles.listName}
            onPress={() => {
              navigation.navigate("Tasks", list);
            }}
          >
            {list.name}
          </Text>
        )}
      </View>
       )
     }
   }

//mstp or mdtp?
//proptypes

