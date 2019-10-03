import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { loadTasks } from '../../actions';
import { ScrollView } from 'react-native-gesture-handler';
import { PropTypes } from 'prop-types';
import { styles } from './styles';
import { Task } from '../common/Task/Task';
import Header from '../common/Header/Header';
import { fetchAllTasks } from '../../Utils/fetchAllTasks';

export class NeedToDoTasks extends Component {
	componentDidMount = async () => {
		await this.fetchTasks();
	};

	fetchTasks = async () => {
		const list = this.props.navigation.state.params;
		const tasks = await fetchAllTasks(list.id);
		this.props.loadTasks(tasks);
	};

	render() {
		const { name } = this.props.navigation.state.params;
		const { tasks, navigation, loadTasks} = this.props;
		let complete = tasks.filter(task => task.completed === true).length
		let percent = parseInt((complete / tasks.length)*100)
		const allTasks = tasks.sort(task => (task.completed) ? 1 : -1)
		const allSortedTasks = allTasks.map(task => {
			return (
				<View style={styles.lists} key={task.id}>
					<Task task={task} navigation={navigation} loadTasks={loadTasks}/>
				</View>
			);
		});
		return (
			<View>
				<View style={styles.listHeader}>
					<Header>{name}</Header>
				</View>
				<View style={{alignSelf: "center"}}>
				{tasks.length > 0 && <Text>{percent}% of the list completed</Text>}
							<View style={{flexDirection: "row", width: "90%"}}>
							<View style={{marginBottom: 10, height: 20, backgroundColor: "maroon", width: `${percent}%`}}></View>
							<View style={{marginBottom: 10, height: 20, backgroundColor: "gray", width: `${100-percent}%`}}></View>
				</View>
				</View>
				<ScrollView>
					{tasks.length < 1 && (
						<View>
							<Text style={styles.text}>No tasks yet!</Text>
						</View>
					)}

					<View>{allSortedTasks}</View>
					<View style={{ height: 200 }}></View>
				</ScrollView>
			</View>
		);
	}
}

export const mapStateToProps = state => ({
	tasks: state.tasks,
	user: state.userAccount
});

export const mapDispatchToProps = dispatch => ({
	loadTasks: tasks => dispatch(loadTasks(tasks))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NeedToDoTasks);

NeedToDoTasks.propTypes = {
	user: PropTypes.object,
	tasks: PropTypes.array
};
