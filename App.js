import React, { Component } from "react";
import Profile from "./Components/Profile/Profile";
import Lists from "./Components/Lists/Lists";
import TaskForm from "./Components/TaskForm/TaskForm";
import IndividualList from "./Components/IndividualList/IndividualList";
import UserHomeScreen from './Components/Screens/UserHomeScreen';
import AppHomeScreen from './Components/Screens/AppHomeScreen';
import Login from './Components/Login/Login';
import CreateAccount from './Components/CreateAccount/CreateAccount';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createStore } from 'redux';
import rootReducer from './reducers'
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

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
    Lists: Lists,
    IndividualList: IndividualList,
    TaskForm: TaskForm
  },
  {
    initialRouteName: "Home",
  },
);

const Navigator = createAppContainer(AppNavigator);

export default App;
