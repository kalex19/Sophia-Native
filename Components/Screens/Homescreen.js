import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { fetchLists } from "../../apiCalls";
import { connect } from "react-redux";
import { loadLists } from "../../actions";

class Homescreen extends Component {
  // uploadLists = () => {
  //   const lists = fetchLists()
  //   this.props.loadLists(lists)
  //   console.log('GOGOGOG', lists)
  //   // this.props.navigation.navigate("Lists", this.props.lists)
  // }

  render() {
    const { lists } = this.props;
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
        {/* <Text style={styles.greeting}>
          Welcome Back {props.profile.profile.username}!
        </Text> */}
        <View style={styles.routes}>
          <TouchableHighlight
            underlayColor="black"
            accessibilityLabel="Tap to navigate to your profile. From there, view your personal information"
            nextFocusDown="20"
            accessible={true}
            onPress={() =>
              this.props.navigation.navigate(
                "Profile",
                this.props.profile.profile
              )
            }
          >
            <Text style={styles.button}>My Account</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.routes}>
          <TouchableHighlight
            underlayColor="black"
            accessibilityLabel="Tap me to navigate to your todo lists. From there view or create your tasks."
            accessible={true}
            onPress={() => this.props.navigation.navigate("Lists", lists)}
          >
            <Text style={styles.button}>My Todo Lists</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: "maroon",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 40
  },
  header: {
    fontSize: 50,
    fontFamily: "Didot"
  },
  greeting: {
    fontSize: 30,
    fontFamily: "Didot",
    margin: 10,
    marginBottom: 30
  },
  button: {
    color: "white",
    fontSize: 25,
    fontFamily: "Didot",
    textAlign: "center"
  },
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  routes: {
    flexDirection: "column",
    backgroundColor: "maroon",
    width: "80%",
    height: "20%",
    justifyContent: "space-around",
    margin: 10
  }
});

export const mapStateToProps = state => ({
  profile: state.profile,
  lists: state.lists
});

export const mapDispatchToProps = dispatch => ({
  loadLists: lists => dispatch(loadLists(lists))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homescreen);

// export default Homescreen
