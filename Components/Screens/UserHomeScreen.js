import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { connect } from 'react-redux';
import { loadLists } from "../../actions";
import { PropTypes } from 'prop-types';
import theme from '../../theme';

export class UserHomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text
            style={styles.header}
            accessibilityLabel="Speech Operated Personal Household Interactive Assistant"
          >
            SOPHIA
          </Text>
        </View>
        <Text style={styles.greeting}>
          Welcome Back, {this.props.user.name}!
        </Text>
        <View style={styles.routes}>
          <TouchableHighlight
            underlayColor="black"
            accessibilityLabel="Tap me to navigate to your profile. From there, view your personal information"
            accessible={true}
            onPress={() => this.props.navigation.navigate("Profile")
            } style={styles.touchExpander}
          >
            <Text style={styles.button}>My Account</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.routes}>
          <TouchableHighlight
            underlayColor="black"
            accessibilityLabel="Tap me to navigate to your todo lists. From there view or create your tasks."
            accessible={true}
            onPress={() => this.props.navigation.navigate("Lists")
          } style={styles.touchExpander}
          >
            <Text style={styles.button}>My Lists</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.userAccount,
  lists: state.lists,
});

export const mapDispatchToProps = dispatch => ({
  loadLists: lists => dispatch(loadLists(lists))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHomeScreen);

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: theme.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 40
  },
  header: {
    fontSize: 50,
    fontFamily: theme.textMain
  },
  greeting: {
    fontSize: 25,
    fontFamily: theme.textMain,
    margin: 10,
    marginBottom: 30,
  },
  button: {
    color: theme.accentOne,
    fontSize: 30,
    fontFamily: theme.textTwo,
    textAlign: "center",
    paddingTop: 25,
  },
  container: {
    backgroundColor: theme.accentOne,
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  routes: {
    flexDirection: "column",
    backgroundColor: theme.primary,
    width: "80%",
    height: "15%",
    justifyContent: "space-around",
    margin: 10,
    borderRadius: 50,
  },
  touchExpander: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
  }
});

UserHomeScreen.propTypes = {
  userAccount: PropTypes.object,
  lists: PropTypes.array
};