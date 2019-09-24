/**
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight, Picker, ScrollView } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { loadLists } from '../../actions';
import { fetchClientLists, postClientList, deleteClientList, patchClientList } from '../../Utils/clientApiCalls';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { PropTypes } from 'prop-types';
import { fetchCaretakers } from '../../Utils/clientApiCalls';
import { postBlob } from '../../Utils/postBlob';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';

export class AddListForm extends Component {
	constructor(props) {
		super(props);
		this.recording = null;
		this.sound = null;
		this.isSeeking = false;
		this.shouldPlayAtEndOfSeek = false;
		this.state = {
			haveRecordingPermissions: false,
			isLoading: false,
			isPlaybackAllowed: false,
			muted: false,
			soundPosition: null,
			soundDuration: null,
			recordingDuration: null,
			shouldPlay: false,
			isPlaying: false,
			isRecording: false,
			fontLoaded: false,
			shouldCorrectPitch: true,
			volume: 1.0,
			rate: 1.0,
			list_title: '',
			list_edit_input: '',
			displayEdit: '',
			caretaker_id: 0,
			caretakers: []
		};
		this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
	}

	componentDidMount = async () => {
		await Font.loadAsync({
			'cutive-mono-regular': require('../../assets/fonts/CutiveMono-Regular.ttf')
		});
		const caretakers = await fetchCaretakers();
		this.setState({ caretakers, fontLoaded: true });
		this._askForPermissions();
	};

	_askForPermissions = async () => {
		const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
		this.setState({
			haveRecordingPermissions: response.status === 'granted'
		});
	};

	_updateScreenForRecordingStatus = status => {
		if (status.canRecord) {
			this.setState({
				isRecording: status.isRecording,
				recordingDuration: status.durationMillis
			});
		} else if (status.isDoneRecording) {
			this.setState({
				isRecording: false,
				recordingDuration: status.durationMillis
			});
			if (!this.state.isLoading) {
				this._stopRecordingAndEnablePlayback();
			}
		}
	};

	async _stopPlaybackAndBeginRecording() {
		this.setState({
			isLoading: true
		});
		if (this.sound !== null) {
			await this.sound.unloadAsync();
			this.sound.setOnPlaybackStatusUpdate(null);
			this.sound = null;
		}
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: true,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			playThroughEarpieceAndroid: false,
			staysActiveInBackground: true
		});
		if (this.recording !== null) {
			this.recording.setOnRecordingStatusUpdate(null);
			this.recording = null;
		}

		const recording = new Audio.Recording();
		// console.log('new recording', recording);
		await recording.prepareToRecordAsync(this.recordingSettings);
		recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

		this.recording = recording;
		await this.recording.startAsync();
		this.setState({ isLoading: false });
	}

	async _stopRecordingAndEnablePlayback() {
		this.setState({ isLoading: true });
		try {
			await this.recording.stopAndUnloadAsync();
			// console.log(recording.createNewLoadedSoundAsync());
		} catch (error) {}
		const info = await FileSystem.getInfoAsync(this.recording.getURI());
		// console.log('recording', this.recording);
		// console.log(`FILE INFO: ${JSON.stringify(info)}`);
		const response = await fetch(info.uri);
		const blob = await response.blob();
		const data = await postBlob(blob);
		this.setState({ list_title: data.text });
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			playsInSilentLockedModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			playThroughEarpieceAndroid: false,
			staysActiveInBackground: true
		});
		const { sound, status } = await this.recording.createNewLoadedSoundAsync(
			{
				isLooping: true,
				isMuted: this.state.muted,
				volume: this.state.volume,
				rate: this.state.rate,
				shouldCorrectPitch: this.state.shouldCorrectPitch
			},
			this._updateScreenForSoundStatus
		);
		this.sound = sound;
		this.setState({
			isLoading: false
		});
	}

	_onRecordPressed = () => {
		if (this.state.isRecording) {
			this._stopRecordingAndEnablePlayback();
		} else {
			this._stopPlaybackAndBeginRecording();
		}
	};

	handleChange = input => {
		this.setState({ list_title: input });
	};

	handleEditList = input => {
		this.setState({ list_edit_input: input });
	};

	handleSubmit = async () => {
		const { list_title, caretaker_id } = this.state;
		const { user } = this.props;
		let newList = {
			name: list_title,
			caretaker_id,
			client_id: user.id,
			key: user.id
		};
		try {
			await postClientList(newList);
			this.setState({ list_title: '', caretaker_id: 0 });
			this.props.navigation.navigate('ClientList');
		} catch (error) {
			console.log(error);
		}
	};

	createNewList = () => {
		const allCaretakers = this.state.caretakers.map(caretaker => {
			return <Picker.Item label={caretaker.name} value={caretaker.id} key={caretaker.id} />;
		});

		return (
			<View style={{ justifyContent: 'center' }}>
				<Input
					placeholder="List name"
					value={this.state.list_title}
					onChangeText={text => this.handleChange(text)}
					accessibilityLabel="List Name Input"
				/>
				<Button
					onPress={this._onRecordPressed}
					disabled={this.state.isLoading}
					accessibilityLabel="Tap me to record the name of your list"
				>
					{this.state.isRecording ? 'Stop' : 'Start'} Recording
				</Button>
				<View>
					<Picker
						selectedValue={this.state.caretaker_id}
						style={{ height: 100, width: '80%', marginLeft: 30, marginBottom: 50 }}
						onValueChange={itemValue => this.setState({ caretaker_id: itemValue })}
					>
						<Picker.Item label="-- Select A Caretaker --" value={0} />
						{allCaretakers}
					</Picker>
				</View>
				<Button
					accessibilityLabel="Tap me to submit the title of your list."
					disabled={this.state.isLoading}
					onPress={this.handleSubmit}
				>
					Submit List
				</Button>
			</View>
		);
	};

	render() {
		if (!this.state.fontLoaded) {
			return <View style={styles.emptyContainer} />;
		}

		if (!this.state.haveRecordingPermissions) {
			return (
				<View style={styles.container}>
					<View />
					<Text style={[styles.noPermissionsText, { fontFamily: 'cutive-mono-regular' }]}>
						You must enable audio recording permissions in order to use this app.
					</Text>
					<View />
				</View>
			);
		}
		return (
			<View>
				<View style={styles.headerContainer}>
					<Text style={styles.header}>Add New List</Text>
				</View>
				<ScrollView>
					{this.createNewList()}
					<View style={{ height: 550 }}></View>
				</ScrollView>
			</View>
		);
	}
}

export const mapStateToProps = state => ({
	lists: state.lists,
	user: state.userAccount
});

export const mapDispatchToProps = dispatch => ({
	loadLists: lists => dispatch(loadLists(lists))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddListForm);

AddListForm.propTypes = {
	lists: PropTypes.array,
	user: PropTypes.object
};
