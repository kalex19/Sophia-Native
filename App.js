import React, { Component } from "react";
import ClientProfile from "./ClientProfile/ClientProfile";
import ClientList from "./ClientList/ClientList";
import AddListForm from "./AddListForm/AddListForm";
import IndividualList from "./IndividualList/IndividualList";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createStore } from 'redux';
import rootReducer from './reducers'
import Homescreen from "./Screens/Homescreen";
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
};

const AppNavigator = createStackNavigator(
  {
    Home: Homescreen,
    Profile: ClientProfile,
    Lists: ClientList,
    IndividualList: IndividualList,
    AddListForm: AddListForm
  },
  {
    initialRouteName: "Home"
  }
);

const Navigator = createAppContainer(AppNavigator);
