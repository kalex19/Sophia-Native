import React, { Component } from 'react';
import Profile from './Components/Profile/Profile';
import UserHomeScreen from './Components/UserHomeScreen/UserHomeScreen';
import AppHomeScreen from './Components/AppHomeScreen/AppHomeScreen';
import Login from './Components/Login/Login';
import AddListForm from './Components/AddListForm/AddListForm';
import CreateAccount from './Components/CreateAccount/CreateAccount';
import EditProfile from './Components/EditProfile/EditProfile';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
<<<<<<< HEAD
=======
import NeedToDoTasks from './Components/NeedToDoTasks/NeedToDoTasks';
import NeedDone from './Components/NeedDone/NeedDone';
import NeedDoneTasks from './Components/NeedDoneTasks/NeedDoneTasks';
import NeedToDo from './Components/NeedToDo/NeedToDo';
import AddTaskForm from './Components/AddTaskForm/AddTaskForm';
>>>>>>> c370d070e70847cfd58f358b436c497c7b6e0a43
import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import NeedDone from './Components/NeedDone/NeedDone';
import NeedDoneTasks from './Components/NeedDoneTasks/NeedDoneTasks';
import NeedToDo from './Components/NeedToDo/NeedToDo';
import NeedToDoTasks from './Components/NeedToDoTasks/NeedToDoTasks';
import AddTaskForm from './Components/AddTaskForm/AddTaskForm';

export const store = createStore(rootReducer);

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Navigator />
			</Provider>
		);
	}
}

const AppNavigator = createStackNavigator(
	{
		Home: {
			screen: AppHomeScreen,
			navigationOptions: {
				header: null
			}
		},
		Login,
		CreateAccount,
		User: {
			screen: UserHomeScreen,
			navigationOptions: {
				headerLeft: false
			}
		},
		Profile,
		EditProfile,
		NeedDone,
		AddListForm,
		NeedDoneTasks,
		AddTaskForm,
		NeedToDo,
		NeedToDoTasks
	},
	{
		initialRouteName: 'Home'
	}
);

const Navigator = createAppContainer(AppNavigator);

export default App;
