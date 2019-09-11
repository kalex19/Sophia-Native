import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import { PropTypes } from 'prop-types';
import theme from '../../theme';
import { logOut } from '../../actions';

export class Profile extends Component {

  logOut = () => {
    this.props.logOut()
    this.props.navigation.navigate("Home")
  }

  render() {
    let allNeeds = this.props.user.needs.map(need => {
      return <Text style={styles.userInfoList} key={Math.random()}>- {need}</Text>
    })
    let allMedications = this.props.user.medications.map(med => {
      return <Text style={styles.userInfoList} key={Math.random()}>- {med}</Text>
     })
    let allAllergies = this.props.user.allergies.map(allergy => {
      return <Text style={styles.userInfoList} key={Math.random()}>- {allergy}</Text>
    })
    let allRestrictions = this.props.user.diet_restrictions.map(restr => {
      return <Text style={styles.userInfoList} key={Math.random()}>- {restr}</Text>
    })
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}> My Profile</Text>
        </View>
        <View style={styles.routes}>
          <TouchableHighlight
            underlayColor="black"
            accessibilityLabel="Tap to log out"
            nextFocusDown="20"
            accessible={true}
            onPress={this.logOut
            }
            style={styles.touchExpander}
          >
            <Text style={styles.logOutButton}>Log Out</Text>
          </TouchableHighlight>
        </View>
        <ScrollView style={styles.profileContainer}>
          <Text style={styles.userInfo}>Username: {this.props.user.username}</Text>
        <Text style={styles.userInfo}>Name: {this.props.user.name}</Text>
        <Text style={styles.userInfo}>Street Adress: {this.props.user.street_address}</Text>
        <Text style={styles.userInfo}>City: {this.props.user.city}</Text>
        <Text style={styles.userInfo}>State: {this.props.user.state}</Text>
        <Text style={styles.userInfo}>Zip Code: {this.props.user.zip}</Text>
        <Text style={styles.userInfo}>Email: {this.props.user.email}</Text>
        <Text style={styles.userInfo}>Phone Number: {this.props.user.phone}</Text>
        <View style={styles.infoCntainer}>
          <Text style={styles.userInfoList}>Needs:</Text>
           {allNeeds}
        </View>
        <View style={styles.infoCntainer}>
          <Text style={styles.userInfoList}>Allergies: </Text>
            {allAllergies}
        </View>
        <View style={styles.infoCntainer}>
          <Text style={styles.userInfoList}>Dietary Restrictions: </Text>
            {allRestrictions}
        </View>
        <View style={styles.infoCntainer}>
          <Text style={styles.userInfoList}>Medications:</Text>
           {allMedications}
        </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userAccount
});

const mapDispatchToProps = dispatch => ({
  logOut: (() => dispatch(logOut()))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  profileContainer: {
    margin: 30
  },
  headerContainer: {
    borderBottomColor:theme.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: theme.textMain,
    margin: 10,
  },
  userInfo: {
    fontSize: 20,
    fontFamily: theme.textTwo,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:theme.primary,
    color: theme.accentOne,
    padding: 20
  },
  infoCntainer: {
    backgroundColor: theme.primary,
    marginTop: 10,
    marginBottom: 10,
    padding: 10
  },
  userInfoList: {
    fontSize: 20,
    fontFamily: theme.textTwo,
    color: theme.accentOne,
  },
  touchExpander: {
    height: "100%",
    borderRadius: 50,
    width: "100%"
  },
  logOutButton: {
    color: theme.accentOne,
    fontSize: 30,
    fontFamily: theme.textTwo,
    textAlign: "center",
    paddingTop: 15,
  },
  routes: {
		flexDirection: "column",
    backgroundColor: theme.primary,
    width: "50%",
    height: "10%",
    justifyContent: "center",
    margin: 10,
    borderRadius: 50,
	}
});

Profile.propTypes = {
  userAccount: PropTypes.object,
};
