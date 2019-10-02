import React, { Component } from "react";
import { Button } from "react-native";
import { connect } from "react-redux";
import { logOut } from './actions';
import { withNavigation } from 'react-navigation';

export class LogOutButton extends Component {
  logOut = () => {
		this.props.logOut({})
		this.props.navigation.navigate('Login');
	};

  render() {
    return (
      <Button
        color="red"
        accessibilityLabel="Tap me to log out."
        onPress={this.logOut}
        title="Log Out"
      >
      </Button>
    );
  }
};

export const mapStateToProps = state => ({
  user: state.userAccount
});
export const mapDispatchToProps = dispatch => ({
  logOut: user => dispatch(logOut(user))
});
export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(LogOutButton));
