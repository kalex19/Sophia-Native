import React, { Component } from "react";
import ClientProfile from "./Components/ClientProfile/ClientProfile";
import ClientList from "./Components/ClientList/ClientList";
import CaretakerProfile from "./Components/CaretakerProfile/CaretakerProfile";
import CaretakerList from "./Components/CaretakerList/CaretakerList";
import TaskForm from "./Components/TaskForm/TaskForm";
import IndividualList from "./Components/IndividualList/IndividualList";
import UserHomeScreen from './Components/Screens/UserHomeScreen';
import ClientHomeScreen from './Components/Screens/ClientHomeScreen';
import CaretakerHomeScreen from './Components/Screens/CaretakerHomeScreen';
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
    Home: UserHomeScreen,
    ClientHome: ClientHomeScreen,
    CaretakerHome: CaretakerHomeScreen,
    Login: Login,
    CreateAccount: CreateAccount,
    ClientProfile: ClientProfile,
    ClientLists: ClientList,
    CaretakerProfile: CaretakerProfile,
    CaretakerLists: CaretakerList,
    IndividualList: IndividualList,
    TaskForm: TaskForm
  },
  {
    initialRouteName: "Home"
  }
);

const Navigator = createAppContainer(AppNavigator);

export default App;
