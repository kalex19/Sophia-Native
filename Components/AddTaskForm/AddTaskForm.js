import React, { Component } from 'react';
import { Text, View, Picker, ScrollView } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { addList } from '../../actions';
import { postClientList } from '../../Utils/clientApiCalls';
import { PropTypes } from 'prop-types';
import { fetchCaretakers } from '../../Utils/clientApiCalls';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import SpeechToText from '../common/SpeechToText/SpeechToText';
import Header from '../common/Header/Header';

export class AddTaskForm extends Component {
    state = {
    task_title: '',
    task_note: '',
    task_due_date: '',
    completed: false,
        task_edit_input: '',
        displayEdit: '',
        caretaker_id: 0,
        caretakers: [],
        client_id: 0,
        clients: []
    };
    componentDidMount = async () => {
        const caretakers = await fetchCaretakers();
        this.setState({ caretakers });
        const clients = await fetchClients();
        this.setState({ clients });
    };
    saveRecordedText = text => {
        this.setState({ list_title: text });
    };
    handleChange = input => {
        this.setState({ list_title: input });
    };
    handleEditList = input => {
        this.setState({ list_edit_input: input });
    };
    handleSubmit = async () => {
        const { task_title, caretaker_id, client_id } = this.state;
        const { user } = this.props;
        if (this.props.user.role === 'client') {
            let taskData = {
                name: task_title,
                caretaker_id,
                client_id: user.id,
                key: user.id
            };
        } else {
            let taskData = {
                name: task_title,
                caretaker_id: user.id,
                client_id,
                key: user.id
            };
        }
        try {
            const task = await postClienttask(taskData);
            this.setState({ task_title: '', caretaker_id: 0 });
            this.props.addtask(task);
            this.props.navigation.navigate('NeedDone');
        } catch (error) {
            console.log(error);
        }
    };
    createNewtask = () => {
        const allCaretakers = this.state.caretakers.map(caretaker => {
            return <Picker.Item label={caretaker.name} value={caretaker.id} key={caretaker.id} />;
        });
        return (
            <View style={{ justifyContent: 'center' }}>
                <Input
                    placeholder="task name"
                    value={this.state.task_title}
                    onChangeText={text => this.handleChange(text)}
                    accessibilityLabel="task Name Input"
                />
                <SpeechToText saveRecordedText={this.saveRecordedText} />
                <View>
                    <Picker
                        selectedValue={this.state.caretaker_id}
                        style={{ width: '85%', borderColor: 'red', borderWidth: 1, alignSelf: 'center' }}
                        onValueChange={itemValue => this.setState({ caretaker_id: itemValue })}
                    >
                        <Picker.Item label="-- Select A Caretaker --" value={0} />
                        {allCaretakers}
                    </Picker>
                </View>
                <Button
                    accessibilityLabel="Tap me to submit the title of your task."
                    disabled={this.state.isLoading}
                    onPress={this.handleSubmit}
                >
                    Submit task
                </Button>
            </View>
        );
    };
    render() {
        return (
            <View>
                <Header>Add New task +</Header>
                <ScrollView>
                    {this.createNewTask()}
                    <View style={{ height: 550 }}></View>
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
    addTask: task => dispatch(addTask(task))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTaskForm);

AddTaskForm.propTypes = {
    tasks: PropTypes.array,
    user: PropTypes.object
};

