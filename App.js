import React, { Component } from "react";
import ClientProfile from "./Components/ClientProfile/ClientProfile";
import ClientList from "./Components/ClientList/ClientList";
import AddListForm from "./Components/AddListForm/AddListForm";
import IndividualList from "./Components/IndividualList/IndividualList";
import Homescreen from "./Components/Screens/Homescreen";
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

export default App;
