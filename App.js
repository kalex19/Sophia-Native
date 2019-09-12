import React, { Component } from "react";
import Profile from "./Components/Profile/Profile";
import CaretakerList from "./Components/CaretakerList/CaretakerList";
import ClientList from "./Components/ClientList/ClientList";
import Tasks from "./Components/Tasks/Tasks";
import UserHomeScreen from './Components/Screens/UserHomeScreen';
import AppHomeScreen from './Components/Screens/AppHomeScreen';
import Login from './Components/Login/Login';
import CreateAccount from './Components/CreateAccount/CreateAccount';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createStore } from 'redux';
import rootReducer from './reducers'
import { Provider } from 'react-redux';

export const store = createStore(rootReducer);

class App extends Component {

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
    Home: AppHomeScreen,
    Login: Login,
    CreateAccount: CreateAccount,
    User: UserHomeScreen,
    Profile: Profile,
    CaretakerList: CaretakerList,
    ClientList: ClientList,
    Tasks: Tasks
  },
  {
    initialRouteName: "Home",
  },
);

const Navigator = createAppContainer(AppNavigator);

export default App;
