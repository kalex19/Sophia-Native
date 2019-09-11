import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import { PropTypes } from 'prop-types';
import theme from '../../theme';
import { logOut } from '../../actions';
import {styles} from './styleProfile'

export class Profile extends Component {

  logOut = () => {
    this.props.logOut()
    this.props.navigation.navigate("Home")
  }

  renderClient = () => {
    return <View>
      <Text style={styles.userInfo}>Street Adress: {this.props.user.street_address}</Text>
      <Text style={styles.userInfo}>City: {this.props.user.city}</Text>
      <Text style={styles.userInfo}>State: {this.props.user.state}</Text>
      <Text style={styles.userInfo}>Zip Code: {this.props.user.zip}</Text>
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
    </View>
  }

  renderCaretaker = () => {
    return <View style={styles.infoCntainer}>
      <Text style={styles.userInfoList}>Abilities:</Text>
      {allAbilities}
    </View>
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
    let allAbilities = this.props.user.diet_restrictions.map(ablility => {
      return <Text style={styles.userInfoList} key={Math.random()}>- {ablility}</Text>
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
        <Text style={styles.userInfo}>Email: {this.props.user.email}</Text>
        <Text style={styles.userInfo}>Phone Number: {this.props.user.phone}</Text>
          {this.props.user.accountType === "client" && this.renderClient}
            {this.props.user.accountType === "caretaker" && this.renderCaretaker}
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

Profile.propTypes = {
  userAccount: PropTypes.object,
};
