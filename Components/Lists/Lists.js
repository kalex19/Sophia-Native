/**
 * @flow
 */

import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Picker,
  ScrollView,
} from 'react-native';
import { TouchableHighlight } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { loadLists } from "../../actions";
import { fetchLists, postList, deleteList, patchList } from "../../Utils/apiCalls";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { PropTypes } from 'prop-types';
// import { getCaretakers } from '../../Utils/getCaretakers';
import { fetchCaretakerLists } from '../../Utils/fetchCaretakerLists';
import ClientList from '../ClientList/ClientList';
import { postBlob } from '../../Utils/postBlob';
import { styles } from './styleLists';
import CaretakerList from '../CaretakerList/CaretakerList';

class Lists extends Component {
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
      list_title: "",
      caretaker_id: null,
      caretakers: [],
    };
    this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
  }

  componentDidMount = async () => {
      await this.returnUpdatedList();
      await Font.loadAsync({
        'cutive-mono-regular': require('../../assets/fonts/CutiveMono-Regular.ttf'),
      });
      const caretakers = await getCaretakers();
      this.setState({caretakers})
      this.setState({ fontLoaded: true });
      this._askForPermissions();
  };

  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  };

  _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };

  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
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
      staysActiveInBackground: true,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    console.log('new recording', recording)
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync();
    this.setState({
      isLoading: false,
    });
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
      console.log(recording.createNewLoadedSoundAsync())
    } catch (error) {
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI());
    console.log('recording',this.recording)
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    const response = await fetch(info.uri);
    const blob = await response.blob();
    this.postBlob(blob)
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const { sound, status } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  }
  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };

  returnUpdatedList = async () => {
    const lists = await fetchLists(this.props.user.id);
    this.props.loadLists(lists);
  };

  toggleEditName = (list_id) => {
    this.setState({ displayEdit: list_id });
  };

  handleChange = input => {
    this.setState({ list_title: input });
  };

  handleEditList = input => {
    this.setState({ list_edit_input: input });
  };

  handleSubmit = async newList => {
    const { list_title, caretaker_id } = this.state;
    const { user } = this.props
    newList = { name: list_title, caretakerId: caretaker_id, clientId: user.id};
    await postList(newList);
    await this.returnUpdatedList();
    this.setState({ list_title: "", caretaker_id: null });
  };

  eraseList = async listId => {
    const { user } = this.props
    await deleteList(user.id, listId);
    this.returnUpdatedList();
  };

  handleSubmitEdit = async listId => {
    const { list_edit_input } = this.state;
    const { user } = this.props
    const modifiedList = { name: list_edit_input };
    await patchList(modifiedList, listId, user.id);
    this.returnUpdatedList();
    this.setState({ list_edit_input: "", displayEdit: false });
  };

  postBlob = (blob) => {
    const options = {
      method: 'POST',
      body: blob,
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    }
  
    fetch("http://evening-dusk-50121.herokuapp.com/api/v1/speech", options)
    .then(res => res.json())
    .then(data => {
      this.setState({list_title: data});
      })
    .catch(error => {
      console.log(error);
      })
  }

  recordListName = () => {
    const allCaretakers =  this.state.caretakers.map(caretaker => {
      <Picker.Item label={caretaker.name} value={caretaker.id} />
    })
   
    return  <View>
    <View style={styles.addListContainer}>
    <TextInput
      style={styles.input}
      placeholder="List name"
      value={this.state.list_title}
      onChangeText={(text) => this.handleChange(text)}
      accessibilityLabel="List Name Input"
    ></TextInput>
    <TouchableHighlight
      underlayColor="black"
      accessibilityLabel="Tap me to submit the title of your list."
      onPress={this.handleSubmit}
    >
      <Text style={styles.plus} accessibilityLabel="Plus Button. Add a new list by typing in the list name input"
     > + </Text>
    </TouchableHighlight>
    </View>
    <View>
      <Picker
        selectedValue={this.state.language}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue) => this.setState({caretaker_id: itemValue})}>
        {allCaretakers}
      </Picker>
    </View>
  <View style={styles.recordingDataContainer}>
    <TouchableHighlight
      onPress={this._onRecordPressed}
      disabled={this.state.isLoading}
      accessibilityLabel="Tap me to record the name of your list"
      style={styles.touchExpander}>
     <Text style={styles.text}>Record List Name</Text>
    </TouchableHighlight>
      <Text style={[styles.liveText, { fontFamily: 'cutive-mono-regular' }]} accessibilityLabel={this.state.isRecording}>
        {this.state.isRecording ? 'RECORDING' : 'STOPPED RECORDING'}
      </Text>
    </View>
  </View>
  };

  getClientLists = () => {
    const { lists, user } = this.props;
    return lists.map(list => {
    list = { ...list, client_id: user.id }
    return (
      <ClientList/>
    );
  }).reverse()
}
//need to complete List component and pass props/methods

getAllCaretakerLists = async () => {
  const lists = await fetchCaretakerLists(this.state.caretaker_id);
  this.props.loadLists(lists);
    return lists.map(list => {
    list = { ...list, client_id: user.id }
    return (
      <CaretakerList/>
    );
  }).reverse()

} 
//need to finish this function


  render() {
    if(!this.state.fontLoaded) {
      return (
          <View style={styles.emptyContainer} />
      )
  }

  if (!this.state.haveRecordingPermissions){
      return (
          <View style={styles.container}>
              <View />
              <Text style={[styles.noPermissionsText, { fontFamily: 'cutive-mono-regular' }]}>
                You must enable audio recording permissions in order to use this app.
              </Text>
              <View />
          </View>
      )
  }
    
    return (
      <View>
      <View style={styles.headerContainer}>
          <Text style={styles.header}>My Todo Lists</Text>
        </View>
         {this.props.user.accountType === "client" && this.recordListName()}
         <ScrollView>
         {this.props.user.accountType === "client" && this.getClientLists()}
         {this.props.user.accountType === "caretaker" && this.getCaretakerLists()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Lists)

Lists.propTypes = {
  lists: PropTypes.array,
  user: PropTypes.object
};
